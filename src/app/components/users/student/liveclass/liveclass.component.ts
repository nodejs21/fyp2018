import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { AngularAgoraRtcService, Stream } from 'angular-agora-rtc';
import { AuthService } from '../../../../utils/services/auth/auth.service';
import { SharedService } from '../../../../utils/services/firestore/shared/shared.service';

// const SERVERS: any = {
//   iceServers: [
//     { urls: 'stun:stun.services.mozilla.com' },
//     { urls: 'stun:stun.l.google.com:19302' }
//   ]
// };

// const DEFAULT_CONSTRAINTS = {
//   optional: []
// };

// declare var RTCMultiConnection;

// declare let RTCPeerConnection: any;
@Component({
  selector: 'app-liveclass',
  templateUrl: './liveclass.component.html',
  styleUrls: ['./liveclass.component.css']
})
export class LiveclassComponent implements OnInit, OnDestroy {
  title = 'AgoraDemo';
  localStream: Stream;
  remoteCalls: any = []; // Add
  classRoomToJoin;
  @ViewChild('myVideo') myVideo: HTMLElement;
  user;
  approvedRequests: any = [];
  classrooms: any;
  subject: any;
  academyId;
  classroom: any;
  ongoingClasses: any = [];
  durationInClass;
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
    this._shared.getStudentClassrooms(academyId).subscribe(classrooms => {
      this.classrooms = classrooms;
      console.log(classrooms);

      this.classrooms.forEach(classroom => {
        this.checkOnGoingClassroom(classroom.id);
      });
    });
  }

  selectClassroom(classroom) {
    this.classRoomToJoin = classroom.id;
    this.classroom = classroom;
    this.subject = classroom.data.subject.subjectName;
  }

  checkOnGoingClassroom(classroomId) {
    this.ongoingClasses = [];
    this._shared
      .checkOnGoingClassroom(this.academyId, classroomId)
      .subscribe(classroom => {
        console.log(classroom);
        this.ongoingClasses = classroom;
      });
  }

  ngOnDestroy() {
    this.leaveClass();
  }

  requestPermission() {
    console.log(this.localStream.getId);
    console.log(this.remoteCalls);
    console.log(this.remoteCalls.length);
  }

  joinClass() {
    this.agoraService.client.join(null, this.classRoomToJoin, null, uid => {
      console.log(uid);
      console.log(this.classRoomToJoin);

      this._shared
        .getPreviousAttendance(this.academyId, this.classroom.id)
        .subscribe(
          res => {
            console.log(res);
          },
          error => {
            console.error(error);
          }
        );

      // this._shared.updateAttendance(this.academyId, this.classroom.id);

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
        this.agoraService.client.on('stream-published', function() {
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
      console.log('stream-added', evt.uid);
      const stream = evt.stream;
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
      console.log(`Remote stream is removed ${this.user.uid}`);
    });

    // Add
    this.agoraService.client.on('peer-leave', evt => {
      const stream = evt.stream;
      if (stream) {
        stream.stop();
        this.remoteCalls = this.remoteCalls.filter(
          call => call === `#${this.user.uid}`
        );
        console.log(`${evt.uid} left from this channel`);
      }
    });
  }

  leaveClass() {
    console.log('Going to leave class');
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
