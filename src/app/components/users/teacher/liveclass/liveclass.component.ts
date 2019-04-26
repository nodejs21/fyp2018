import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularAgoraRtcService, Stream } from 'angular-agora-rtc';

@Component({
  selector: 'app-liveclass',
  template: `
    <input class="form-control" type="text" placeholder="Classroom name" [(ngModel)]="classRoomToCreate" />
    <div id="agora_local"></div>
    <div class="remote-containers">
      <div
        class="remote_calls"
        *ngFor="let remote of remoteCalls"
        [id]="remote"
      ></div>
    </div>
    <button (click)="startCall()">Start Call</button>
  `,
  // templateUrl: './liveclass.component.html',
  styleUrls: ['./liveclass.component.css']
})
export class LiveclassComponent implements OnInit, OnDestroy {
  //! AGORA AGORA AGORA AGORA AGORA AGORA AGORA AGORA AGORA AGORA AGORA
  //! AGORA AGORA AGORA AGORA AGORA AGORA AGORA AGORA AGORA AGORA AGORA
  //! AGORA AGORA AGORA AGORA AGORA AGORA AGORA AGORA AGORA AGORA AGORA

  title = 'AgoraDemo';
  localStream: Stream;
  remoteCalls: any = []; // Add
  classRoomToCreate;

  constructor(private agoraService: AngularAgoraRtcService) {}

  ngOnInit() {
    this.agoraService.createClient();
  }

  ngOnDestroy() {}

  startCall() {
    this.agoraService.client.join(null, this.classRoomToCreate, null, uid => {
      console.log(uid);
      console.log(this.classRoomToCreate);

      this.localStream = this.agoraService.createStream(
        uid,
        true,
        null,
        null,
        true,
        false
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
        this.agoraService.client.on('stream-published', function(evt) {
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
      this.agoraService.client.subscribe(stream, err => {
        console.log('Subscribe stream failed', err);
      });
    });

    // Add
    this.agoraService.client.on('stream-subscribed', evt => {
      const stream = evt.stream;
      if (!this.remoteCalls.includes(`agora_remote${stream.getId()}`))
        this.remoteCalls.push(`agora_remote${stream.getId()}`);
      console.log(this.remoteCalls);
      setTimeout(() => stream.play(`agora_remote${stream.getId()}`), 2000);
    });

    // Add
    this.agoraService.client.on('stream-removed', evt => {
      const stream = evt.stream;
      stream.stop();
      this.remoteCalls = this.remoteCalls.filter(
        call => call !== `#agora_remote${stream.getId()}`
      );
      console.log(`Remote stream is removed ${stream.getId()}`);
    });

    // Add
    this.agoraService.client.on('peer-leave', evt => {
      const stream = evt.stream;
      if (stream) {
        stream.stop();
        this.remoteCalls = this.remoteCalls.filter(
          call => call === `#agora_remote${stream.getId()}`
        );
        console.log(`${evt.uid} left from this channel`);
      }
    });
  }

  //! AGORA AGORA AGORA AGORA AGORA AGORA AGORA AGORA AGORA AGORA AGORA
  //! AGORA AGORA AGORA AGORA AGORA AGORA AGORA AGORA AGORA AGORA AGORA
  //! AGORA AGORA AGORA AGORA AGORA AGORA AGORA AGORA AGORA AGORA AGORA
  // title = 'AgoraDemo';
  // localStream: Stream;

  // // Add
  // constructor(private agoraService: AngularAgoraRtcService) {}

  // ngOnInit() {
  //   this.agoraService.createClient();
  // }

  // ngOnDestroy() {}

  // // Add
  // startCall() {
  //   this.agoraService.client.join(null, '1000', null, uid => {
  //     this.localStream = this.agoraService.createStream(
  //       uid,
  //       true,
  //       null,
  //       null,
  //       true,
  //       false
  //     );
  //     this.localStream.setVideoProfile('720p_3');
  //     this.subscribeToStreams();
  //   });
  // }

  // // Add
  // private subscribeToStreams() {
  //   this.localStream.on('accessAllowed', () => {
  //     console.log('accessAllowed');
  //   });
  //   // The user has denied access to the camera and mic.
  //   this.localStream.on('accessDenied', () => {
  //     console.log('accessDenied');
  //   });

  //   this.localStream.init(
  //     () => {
  //       console.log('getUserMedia successfully');
  //       this.localStream.play('agora_local');
  //       this.agoraService.client.publish(this.localStream, function(err) {
  //         console.log('Publish local stream error: ' + err);
  //       });
  //       this.agoraService.client.on('stream-published', function() {
  //         console.log('Publish local stream successfully');
  //       });
  //     },
  //     function(err) {
  //       console.log('getUserMedia failed', err);
  //     }
  //   );
  // }

  //! AGORA AGORA AGORA AGORA AGORA AGORA AGORA AGORA AGORA AGORA AGORA
  //! AGORA AGORA AGORA AGORA AGORA AGORA AGORA AGORA AGORA AGORA AGORA
  //! AGORA AGORA AGORA AGORA AGORA AGORA AGORA AGORA AGORA AGORA AGORA

  // targetpeer: any;
  // dataChannel: any;
  // peer: any;
  // server: any = null;
  // n = <any>navigator;
  // initiatorOffer: any;
  // clientanswer: any;
  // recieveanswer: any;
  // expectanswer: boolean = false;
  // @ViewChild('friendsVideo') friendsVideo: any;
  // @ViewChild('myVideo') myVideo: any;
  // turnReady: boolean;
  // localvideostream: any;
  // friendsVideostream: any;
  // pcConfig = {
  //   iceServers: [
  //     {
  //       urls: 'stun:stun.l.google.com:19302',
  //       credential: ''
  //     }
  //   ]
  // };
  // roomToCreate = '92';
  // approvedRequests: {};
  // classrooms = [];
  // students;
  // academyId;
  // classroomId;
  // studentsCount: number;
  // questions;
  // newRequest;

  // constructor(private _shared: SharedService, private _auth: AuthService) {}

  // ngOnInit() {
  //   this._auth.user.subscribe(async () => {
  //     await this.getApprovedRequests().then(requests => {
  //       this.approvedRequests = requests;
  //       console.log(this.approvedRequests);
  //     });
  //     // this.approvedRequests.forEach(requests => {
  //     //   requests.forEach(request => {
  //     //     console.log(request);
  //     //     // this.getAcademyData(request);
  //     //   });
  //     // });
  //   });

  //   this.n.getUserMedia =
  //     this.n.getUserMedia ||
  //     this.n.webkitGetUserMedia ||
  //     this.n.mozGetUserMedia ||
  //     this.n.msGetUserMedia;
  //   this.n.getUserMedia(
  //     { video: true, audio: true },
  //     stream => {
  //       this.localstream(stream);
  //     },
  //     () => {}
  //   );

  //   if (location.hostname !== 'localhost') {
  //     this.requestTurn(
  //       'https://computeengineondemand.appspot.com/turn?username=41784574&key=4080218913'
  //     );
  //   }
  //   //////////////////////////////////////
  //   this.peer = new RTCPeerConnection(this.pcConfig);
  //   this.peer.onaddstream = this.handleRemoteStreamAdded;
  //   this.peer.onicecandidate = this.sendIcecandidates;
  //   setTimeout(() => {
  //     console.log(this.localvideostream);
  //     this.peer.addStream(this.localvideostream);
  //     console.log('local stream added');
  //   }, 1000);
  // }

  // ngOnDestroy(): void {
  //   this.peer = undefined;
  //   this.informStudentsOfEndClass();
  // }

  // informStudentsOfEndClass() {
  //   if (!this.students) return;
  //   this.students.forEach(student => {
  //     console.log(student);
  //     console.log(student.studentId);
  //     this._shared.liveclassFinished(student.studentId);
  //   });
  // }

  // getAcademyData(academyId) {
  //   console.log(academyId);
  //   return new Promise(resolve => {
  //     this._shared.getTeacherClassrooms(academyId).subscribe(classrooms => {
  //       resolve(classrooms);
  //       // this.classrooms.push(classrooms);
  //       // console.log(this.classrooms);
  //     });
  //   });
  // }

  // getApprovedRequests() {
  //   var temp = [];
  //   return new Promise(resolve => {
  //     {
  //       this._shared.getUserRequests().subscribe(userInfo => {
  //         if (!userInfo['requests']) return;
  //         userInfo['requests'].forEach(async request => {
  //           await this._shared
  //             .getApprovedRequests(request.academyId)
  //             .subscribe(request => {
  //               temp.push(request);
  //             });
  //         });
  //         resolve(temp);
  //       });
  //     }
  //   });
  // }

  // endClass() {
  //   this._shared
  //     .endLiveClassByTeacher(this.academyId, this.classroomId)
  //     .then(() => {
  //       this.informStudentsOfEndClass();
  //     });
  // }

  // givePermission(permit) {
  //   this._shared
  //     .givePermission(
  //       permit,
  //       this.academyId,
  //       this.classroomId,
  //       this.newRequest.studentId
  //     )
  //     .then(res => {
  //       console.log(res);
  //       // this.newRequest = undefined;
  //     });
  // }

  // initConnection(academy?) {
  //   this.n.getUserMedia =
  //     this.n.getUserMedia ||
  //     this.n.webkitGetUserMedia ||
  //     this.n.mozGetUserMedia ||
  //     this.n.msGetUserMedia;
  //   this.n.getUserMedia(
  //     { video: true, audio: true },
  //     stream => {
  //       this.localstream(stream);
  //     },
  //     () => {}
  //   );

  //   if (location.hostname !== 'localhost') {
  //     this.requestTurn(
  //       'https://computeengineondemand.appspot.com/turn?username=41784574&key=4080218913'
  //     );
  //   }
  //   //////////////////////////////////////
  //   this.peer = new RTCPeerConnection(this.pcConfig);
  //   this.peer.onaddstream = this.handleRemoteStreamAdded;
  //   this.peer.onicecandidate = this.sendIcecandidates;
  //   setTimeout(() => {
  //     console.log(this.localvideostream);
  //     this.peer.addStream(this.localvideostream);
  //     console.log('local stream added');
  //     console.log(academy);
  //     // this.approvedRequests.forEach(requests => {
  //     //   requests.forEach(request => {
  //     //     console.log(request);
  //     // this.getAcademyData(academy.data.academyId).then(classrooms => {
  //     //   console.log(classrooms);
  //     //   console.log(classrooms[0]);
  //     //   this.academyId = academy.data.academyId;
  //     //   this.classroomId = classrooms[0].id;
  //     //   this._shared
  //     //     .startLiveClass(academy.data.academyId, classrooms[0].id)
  //     //     .then(liveClass => {
  //     //       console.log(liveClass);
  //     //       this.students = classrooms[0].data.students;
  //     //       this.students.forEach(student => {
  //     //         console.log(student);
  //     //         this._shared
  //     //           .studentsInClassroom(this.academyId, this.classroomId)
  //     //           .subscribe(students => {
  //     //             console.log(students);
  //     //             this.studentsCount = students.length;
  //     //             this._shared
  //     //               .subscribeToQuestions(this.academyId, this.classroomId)
  //     //               .subscribe(questions => {
  //     //                 console.log(questions);
  //     //                 console.log(questions[this.questions ? this.questions.length : 0]);
  //     //                 this.newRequest =
  //     //                   questions[this.questions ? this.questions.length : 0];
  //     //                 this.questions = questions;
  //     //                 console.log(this.questions);
  //     //               });
  //     //           });
  //     //         this._shared.informStudentsOfClassroom(
  //     //           student.studentId,
  //     //           academy.data.academyId,
  //     //           classrooms[0].id
  //     //         );
  //     //       });
  //     //     });
  //     // });
  //     //   });
  //     // });
  //   }, 1000);
  //   // for video chat and voice chat

  //   // // recieve teacher offer
  //   // this._shared.getOffer(this.roomToCreate).subscribe(data => {
  //   //   console.log(data);
  //   //   // this.peer.setRemoteDescription(new RTCSessionDescription(data), () => {});
  //   //   this.peer.createAnswer().then(this.localDescCreated);
  //   // });
  //   // recieve answer  from student
  //   this._shared.getAnswer(this.roomToCreate).subscribe(data => {
  //     console.log(data);
  //     var msg = JSON.parse(data[0]['data']['answer']);
  //     this.peer.setRemoteDescription(new RTCSessionDescription(msg), () => {});
  //   });

  //   this._shared.getAnswerCandidate(this.roomToCreate).subscribe(data => {
  //     console.log('Recieved candidate');
  //     // let values = Object.keys(data).map(key => data[key]);
  //     this.peer.addIceCandidate(
  //       new RTCIceCandidate({
  //         candidate: data.data().candidate.candidate
  //       })
  //     );
  //     // if (location.hash != '#init') {
  //     this.peer.ondatachannel = function(event) {
  //       var channel = event.channel;
  //       channel.onopen = function() {
  //         console.log('channelopened');
  //         channel.send('Hi back!');
  //       };
  //       channel.onmessage = function(event) {
  //         console.log('messege arrived');

  //         console.log(event.data);
  //       };
  //     };
  //     // }
  //   });
  // }

  // //!&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
  // //!&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
  // //!&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
  // //!&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
  // //!&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

  // sendOffer() {
  //   this.peer = new RTCPeerConnection(this.pcConfig);
  //   this.peer.addStream(this.localvideostream);
  //   this.peer.createOffer().then(this.localDescCreated);
  //   this._shared.getAnswer(this.roomToCreate).subscribe(data => {
  //     console.log(data);
  //     var msg = JSON.parse(data[0]['data']['answer']);
  //     this.peer.setRemoteDescription(new RTCSessionDescription(msg), () => {});
  //   });
  // }
  // // receiveOffer() {}
  // sendCandidate() {
  //   this.peer.onicecandidate = this.sendIcecandidates;
  //   this._shared.getAnswerCandidate(this.roomToCreate).subscribe(data => {
  //     console.log('Recieved candidate');
  //     console.log(data.data());

  //     // let values = Object.keys(data).map(key => data[key]);
  //     if (data.data().candidates) {
  //       data.data().candidates.forEach(candidate => {
  //         this.peer.addIceCandidate(
  //           new RTCIceCandidate({
  //             candidate: candidate.candidate
  //           })
  //         );
  //       });
  //     }
  //     // if (location.hash != '#init') {
  //     this.peer.ondatachannel = function(event) {
  //       var channel = event.channel;
  //       channel.onopen = function() {
  //         console.log('channelopened');
  //         channel.send('Hi back!');
  //       };
  //       channel.onmessage = function(event) {
  //         console.log('messege arrived');

  //         console.log(event.data);
  //       };
  //     };
  //     // }
  //   });
  // }
  // // receiveCandidate() {}
  // sendMediaStreamObject() {
  //   this.peer.onaddstream = this.handleRemoteStreamAdded;
  // }
  // // receiveMediaStreamObject() {}

  // //!&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
  // //!&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
  // //!&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
  // //!&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
  // //!&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

  // ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // requestTurn(turnURL) {
  //   var turnExists = false;
  //   for (var i in this.pcConfig.iceServers) {
  //     if (this.pcConfig.iceServers[i].urls.substr(0, 5) === 'turn:') {
  //       turnExists = true;
  //       this.turnReady = true;
  //       break;
  //     }
  //   }
  //   if (!turnExists) {
  //     console.log('Getting TURN server from ', turnURL);
  //     // No TURN server. Get one from computeengineondemand.appspot.com:
  //     var xhr = new XMLHttpRequest();
  //     xhr.onreadystatechange = () => {
  //       if (xhr.readyState === 4 && xhr.status === 200) {
  //         var turnServer = JSON.parse(xhr.responseText);
  //         console.log('Got TURN server: ', turnServer);
  //         this.pcConfig.iceServers.push({
  //           urls: 'turn:' + turnServer.username + '@' + turnServer.turn,
  //           credential: turnServer.password
  //         });
  //         this.turnReady = true;
  //       }
  //     };
  //     xhr.open('GET', turnURL, true);
  //     xhr.send();
  //   }
  // }

  // localstream(stream) {
  //   console.log('got local stream');

  //   this.localvideostream = stream;
  //   let video = this.myVideo.nativeElement;
  //   video.srcObject = stream;
  // }

  // //creating the WEB-RTC session
  // creatingWebRtcConnection() {
  //   this.peer = new RTCPeerConnection(this.pcConfig);
  //   this.peer.addStream(this.localvideostream);
  //   this.peer.createOffer().then(this.localDescCreated);
  //   this.peer.onaddstream = this.handleRemoteStreamAdded;
  //   this.peer.onicecandidate = this.sendIcecandidates;
  // }
  // sendIcecandidates = event => {
  //   console.log(event);
  //   if (event.candidate) {
  //     console.log('Sending Ice candidate');
  //     this._shared.sendOfferCandidate(this.roomToCreate, {
  //       type: 'candidate',
  //       label: event.candidate.sdpMLineIndex,
  //       id: event.candidate.sdpMid,
  //       candidate: event.candidate.candidate
  //     });
  //   } else {
  //     console.log('End of candidates.');
  //   }
  // };
  // handleRemoteStreamAdded = event => {
  //   console.log('got remort stream');
  //   console.log(event.stream);
  //   this.friendsVideo.nativeElement.srcObject = event.stream;
  //   // let video1 = this.friendsVideo.nativeElement;
  //   // console.log(event.stream);
  //   // var str = event.stream;
  //   // video1.srcObject = str;
  // };
  // localDescCreated = desc => {
  //   console.log(desc);
  //   this.peer.setLocalDescription(desc, () => {
  //     if (desc.type === 'offer') {
  //       //  send ooofer message
  //       this._shared.sendOffer(this.roomToCreate, desc);
  //     }
  //     if (desc.type === 'answer') {
  //     }
  //   });
  // };
}
