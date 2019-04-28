import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularAgoraRtcService, Stream } from 'angular-agora-rtc';
import { AuthService } from '../../../../utils/services/auth/auth.service';
import { SharedService } from '../../../../utils/services/firestore/shared/shared.service';

@Component({
  selector: 'app-liveclass',
  templateUrl: './liveclass.component.html',
  styleUrls: ['./liveclass.component.css']
})
export class LiveclassComponent implements OnInit, OnDestroy {
  title = 'AgoraDemo';
  localStream: Stream;
  remoteCalls: any = []; // Add
  classRoomToCreate;
  user;
  approvedRequests: any = [];
  classrooms: any;
  subject: any;
  academyId: any;

  constructor(
    private agoraService: AngularAgoraRtcService,
    private _auth: AuthService,
    private _shared: SharedService
  ) {}

  ngOnInit() {
    this._auth.user.subscribe(user => {
      this.user = user;
      this._shared.getUserRequests().subscribe(user => {
        if (!user['requests']) return;
        user['requests'].forEach(academy => {
          this._shared
            .getApprovedRequests(academy.academyId)
            .subscribe(request => {
              console.log(request);
              if (!request) return;
              if (request.length > 0) {
                this.approvedRequests.push(request);
              }
            });
        });
      });
      this.agoraService.createClient();
    });
  }

  getAcademyData(academyId) {
    console.log(academyId);
    this.academyId = academyId;
    this._shared.getTeacherClassrooms(academyId).subscribe(classrooms => {
      this.classrooms = classrooms;
    });
  }

  selectClassroom(classroom) {
    this.classRoomToCreate = classroom.id;
    this.subject = classroom.data.subject.subjectName;
  }

  ngOnDestroy() {
    this.endClass();
  }

  startClass() {
    this.agoraService.client.join(null, this.classRoomToCreate, null, uid => {
      console.log(uid);
      console.log(this.classRoomToCreate);

      this.localStream = this.agoraService.createStream(
        this.user.uid, //streamId
        true, //audio
        null, //cameraId
        null, //microphoneId
        true, //video
        false //screen
      );
      this.localStream.setVideoProfile('720p_3');
      this.subscribeToStreams();
      this.startClassroom();
    });
  }

  private subscribeToStreams() {
    this.localStream.on('accessAllowed', () => {
      console.log('accessAllowed');
    });
    // The user has denied access to the camera and mic.
    this.localStream.on('accessDenied', () => {
      console.log('accessDenied');
    });

    this.localStream.init(
      () => {
        console.log('getUserMedia successfully');
        this.localStream.play('agora_local');
        this.agoraService.client.publish(this.localStream, function(err) {
          console.log('Publish local stream error: ' + err);
        });
        this.agoraService.client.on('stream-published', function(evt) {
          console.log('stream-published', evt.uid);
          console.log('Publish local stream successfully');
        });
      },
      function(err) {
        console.log('getUserMedia failed', err);
      }
    );

    // Add
    this.agoraService.client.on('error', err => {
      console.log('Got error msg:', err.reason);
      if (err.reason === 'DYNAMIC_KEY_TIMEOUT') {
        this.agoraService.client.renewChannelKey(
          '',
          () => {
            console.log('Renew channel key successfully');
          },
          err => {
            console.log('Renew channel key failed: ', err);
          }
        );
      }
    });

    // Add
    this.agoraService.client.on('stream-added', evt => {
      const stream = evt.stream;
      console.log('stream-added', stream.getId());
      this.agoraService.client.subscribe(stream, err => {
        console.log('Subscribe stream failed', err);
      });
    });

    // Add
    this.agoraService.client.on('stream-subscribed', evt => {
      const stream = evt.stream;
      console.log('stream-subscribed', stream.getId());
      if (!this.remoteCalls.includes(`${this.user.uid}`))
        this.remoteCalls.push(`${this.user.uid}`);
      console.log(this.remoteCalls);
      setTimeout(() => stream.play(`${this.user.uid}`), 2000);
    });

    // Add
    this.agoraService.client.on('stream-removed', evt => {
      const stream = evt.stream;
      stream.stop();
      this.remoteCalls = this.remoteCalls.filter(
        call => call !== `#${this.user.uid}`
      );
      console.log(`Remote stream is removed ${stream.getId()}`);
    });

    // Add
    this.agoraService.client.on('peer-leave', evt => {
      const stream = evt.stream;
      if (stream) {
        stream.stop();
        this.remoteCalls = this.remoteCalls.filter(
          call => call === `#${this.user.uid}`
        );
        console.log(`${evt.uid} left from this channel | ${stream.getId()}`);
      }
    });
  }

  startClassroom() {
    this._shared
      .startLiveClass(this.academyId, this.classRoomToCreate)
      .then(res => {
        console.log(res);
      });
  }

  shareScreen() {
    // this.agoraService.client;
  }

  endClass() {
    this.agoraService.client.leave(
      () => {
        console.log('Leavel channel successfully');
      },
      err => {
        console.log('Leave channel failed');
      }
    );
  }
}
