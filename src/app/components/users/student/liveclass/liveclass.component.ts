import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularAgoraRtcService, Stream } from 'angular-agora-rtc';

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
  template: `
    <input class="form-control" type="text" [(ngModel)]="classRoomToJoin" />
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
  classRoomToJoin;

  constructor(private agoraService: AngularAgoraRtcService) {}

  ngOnInit() {
    this.agoraService.createClient();
  }

  ngOnDestroy() {}

  startCall() {
    this.agoraService.client.join(null, this.classRoomToJoin, null, uid => {
      console.log(uid);
      console.log(this.classRoomToJoin);

      this.localStream = this.agoraService.createStream(
        this.classRoomToJoin,
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
}

// export class LiveclassComponent implements OnInit {
//   htmlContent = 'Create your assignment';
//   config: AngularEditorConfig = {
//     editable: true,
//     spellcheck: true,
//     height: '25rem',
//     minHeight: '5rem',
//     placeholder: 'Enter text here...',
//     translate: 'no',
//     // uploadUrl: 'v1/images', // if needed
//     customClasses: [
//       // optional
//       {
//         name: 'quote',
//         class: 'quote'
//       },
//       {
//         name: 'redText',
//         class: 'redText'
//       },
//       {
//         name: 'titleText',
//         class: 'titleText',
//         tag: 'h1'
//       }
//     ]
//   };

//   targetpeer: any;
//   dataChannel: any;
//   peer: any;
//   server: any = null;
//   n = <any>navigator;
//   initiatorOffer: any;
//   clientanswer: any;
//   recieveanswer: any;
//   expectanswer: boolean = false;
//   @ViewChild('teacherVideo') teacherVideo: any;
//   @ViewChild('myVideo') myVideo: any;
//   turnReady: boolean;
//   localvideostream: any;
//   teacherVideostream: any;
//   pcConfig = {
//     iceServers: [
//       {
//         urls: 'stun:stun.l.google.com:19302',
//         credential: ''
//       }
//     ]
//   };
//   roomToJoin = '92';
//   channel;
//   currentClass;
//   approvedRequests: {};
//   btnPermissionDisabled = true;
//   durationInClass = 0;
//   academyId;
//   classroomId;
//   permission;

//   constructor(
//     private _shared: SharedService,
//     private _auth: AuthService
//   ) {}

//   joinClass() {
//     // recieve teacher offer
//     this._shared.getOffer(this.roomToJoin).subscribe(data => {
//       console.log(data);
//       var msg = JSON.parse(data[0]['data']['offer']);
//       console.log(msg);
//       this.peer.setRemoteDescription(new RTCSessionDescription(msg), () => {
//         this.peer.createAnswer().then(this.localDescCreated);
//         this._shared.joinClass().subscribe();
//       });
//     });
//   }

//   ngOnInit() {
//     this._auth.user.subscribe(async () => {
//       await this.getApprovedRequests().then(requests => {
//         this.approvedRequests = requests;
//         console.log(this.approvedRequests);
//       });
//       this._shared.getUpdatesOfLiveclass().subscribe(res => {
//         const academyId = res['academyId'];
//         const classroomId = res['classroomId'];
//         if (academyId && classroomId) {
//           this.academyId = academyId;
//           this.classroomId = classroomId;
//           this._shared
//             .attendLiveClass(academyId, classroomId)
//             .subscribe(liveclass => {
//               this.btnPermissionDisabled = false;
//               console.log(liveclass);
//               this._shared
//                 .getPreviousAttendance(academyId, classroomId)
//                 .subscribe(attendance => {
//                   console.log(attendance);
//                   this.durationInClass += attendance
//                     ? attendance['durationInClass']
//                       ? attendance['durationInClass']
//                       : 0
//                     : 0;
//                   this.startCountingAttendance();
//                   // this.updateAttendance();
//                 });
//             });
//         } else {
//           this.btnPermissionDisabled = true;
//         }
//       });
//       // this.approvedRequests.forEach(requests => {
//       //   requests.forEach(request => {
//       //     console.log(request);
//       //     // this.getAcademyData(request);
//       //   });
//       // });
//     });
//   }

//   startCountingAttendance() {
//     setInterval(() => this.durationInClass++, 1000);
//   }

//   updateAttendance() {
//     this._shared.updateAttendance(
//       this.academyId,
//       this.classroomId,
//       this.durationInClass
//     );
//   }

//   ngOnDestroy(): void {
//     this.peer = undefined;
//     // this.updateAttendance();
//   }

//   getAcademyData(academyId) {
//     console.log(academyId);
//     return new Promise((resolve) => {
//       this._shared.getStudentClassrooms(academyId).subscribe(classrooms => {
//         resolve(classrooms);
//         // this.classrooms.push(classrooms);
//         // console.log(this.classrooms);
//       });
//     });
//   }

//   getApprovedRequests() {
//     var temp = [];
//     return new Promise((resolve) => {
//       {
//         this._shared.getUserRequests().subscribe(userInfo => {
//           if (!userInfo['requests']) return;
//           userInfo['requests'].forEach(async request => {
//             await this._shared
//               .getApprovedRequests(request.academyId)
//               .subscribe(request => {
//                 temp.push(request);
//               });
//           });
//           resolve(temp);
//         });
//       }
//     });
//   }

//   initConnection() {
//     this.n.getUserMedia =
//       this.n.getUserMedia ||
//       this.n.webkitGetUserMedia ||
//       this.n.mozGetUserMedia ||
//       this.n.msGetUserMedia;
//     this.n.getUserMedia(
//       { video: true, audio: true },
//       stream => {
//         this.localstream(stream);
//       },
//       () => {}
//     );
//     if (location.hostname !== 'localhost') {
//       this.requestTurn(
//         'https://computeengineondemand.appspot.com/turn?username=41784574&key=4080218913'
//       );
//     }
//     //////////////////////////////////////
//     this.peer = new RTCPeerConnection(this.pcConfig);
//     this.channel = this.peer.createDataChannel(this.roomToJoin);
//     // this.peer.ontrack = e => {
//     //   console.log('got track', e.track, e.streams);
//     //   this.teacherVideo.nativeElement.srcObject = e.streams[0];
//     // };
//     this.peer.onaddstream = this.handleRemoteStreamAdded;
//     this.peer.onicecandidate = this.sendIcecandidates;
//     setTimeout(() => {
//       console.log(this.localvideostream);
//       this.peer.addStream(this.localvideostream);
//       console.log('local stream added');
//     }, 1000);

//     // for video chat and voice chat
//     // // recieve teacher offer
//     // this._shared.getOffer(this.roomToJoin).subscribe(data => {
//     //   console.log(data);
//     //   var msg = JSON.parse(data[0]['data']['offer']);
//     //   console.log(msg);
//     //   this.peer.setRemoteDescription(new RTCSessionDescription(msg), () => {
//     //     this.peer.createAnswer().then(this.localDescCreated);
//     //   });
//     // });
//     // // recieve answer  from student
//     // this._shared.getAnswer(this.roomToJoin).subscribe(data => {
//     //   console.log(data);
//     //   // this.peer.setRemoteDescription(new RTCSessionDescription(data), () => {});
//     // });
//     this._shared.getOfferCandidate(this.roomToJoin).subscribe(data => {
//       console.log('Recieved candidate');
//       console.log(data);
//       if (data.data().candidates) {
//         data.data().candidates.forEach(candidate => {
//           this.peer.addIceCandidate(
//             new RTCIceCandidate({
//               candidate: candidate.candidate
//             })
//           );
//         });
//       }
//       // if (location.hash != '#init') {
//       this.peer.ondatachannel = function(event) {
//         console.log(event);
//         var channel = event.channel;
//         channel.onopen = function() {
//           console.log('channelopened');
//           channel.send('Hi back!');
//         };
//         channel.onmessage = function(event) {
//           console.log('messege arrived');
//           console.log(event.data);
//         };
//       };
//       // }
//     });
//   }

//   // sendMessage(msg) {

//   // }

//   ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//   requestTurn(turnURL) {
//     var turnExists = false;
//     for (var i in this.pcConfig.iceServers) {
//       if (this.pcConfig.iceServers[i].urls.substr(0, 5) === 'turn:') {
//         turnExists = true;
//         this.turnReady = true;
//         break;
//       }
//     }
//     if (!turnExists) {
//       console.log('Getting TURN server from ', turnURL);
//       // No TURN server. Get one from computeengineondemand.appspot.com:
//       var xhr = new XMLHttpRequest();
//       xhr.onreadystatechange = () => {
//         if (xhr.readyState === 4 && xhr.status === 200) {
//           var turnServer = JSON.parse(xhr.responseText);
//           console.log('Got TURN server: ', turnServer);
//           this.pcConfig.iceServers.push({
//             urls: 'turn:' + turnServer.username + '@' + turnServer.turn,
//             credential: turnServer.password
//           });
//           this.turnReady = true;
//         }
//       };
//       xhr.open('GET', turnURL, true);
//       xhr.send();
//     }
//   }

//   localstream(stream) {
//     console.log('got local stream');

//     this.localvideostream = stream;
//     let video = this.myVideo.nativeElement;

//     video.srcObject = stream;
//   }

//   sendIcecandidates = event => {
//     console.log(event);
//     if (event.candidate) {
//       console.log('Sending Ice candidate');
//       this.peer.addIceCandidate(new RTCIceCandidate(event.candidate));
//       this._shared.sendAnswerCandidate(this.roomToJoin, {
//         type: 'candidate',
//         label: event.candidate.sdpMLineIndex,
//         id: event.candidate.sdpMid,
//         candidate: event.candidate.candidate
//       });
//     } else {
//       console.log('End of candidates.');
//     }
//   };
//   handleRemoteStreamAdded = event => {
//     console.log('got remort stream');
//     console.log(event.stream);
//     this.teacherVideo.nativeElement.srcObject = event.stream;
//     // let video1 = this.teacherVideo.nativeElement;
//     // var str = event.stream;
//     // video1.srcObject = str;
//   };
//   localDescCreated = desc => {
//     console.log(desc);
//     this.peer.setLocalDescription(desc, () => {
//       this._shared.sendAnswer(this.roomToJoin, desc);
//       if (desc.type === 'offer') {
//       }
//       if (desc.type === 'answer') {
//       }
//     });
//   };

//   askForPermission() {
//     this._shared.askPermission(this.academyId, this.classroomId).then(() => {
//       this._shared
//         .checkPermission(this.academyId, this.classroomId)
//         .subscribe(res => {
//           this.permission = res;
//           console.log(this.permission);
//         });
//     });
//   }
// }
