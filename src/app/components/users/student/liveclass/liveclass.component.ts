import { Component, OnInit, ViewChild } from '@angular/core';
import { StudentService } from '../../../../utils/services/firestore/student/student.service';
import { SharedService } from '../../../../utils/services/firestore/shared/shared.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { take } from 'rxjs/internal/operators/take';

const SERVERS: any = {
  iceServers: [
    { urls: 'stun:stun.services.mozilla.com' },
    { urls: 'stun:stun.l.google.com:19302' }
  ]
};

const DEFAULT_CONSTRAINTS = {
  optional: []
};

declare var RTCMultiConnection;

declare let RTCPeerConnection: any;
@Component({
  selector: 'app-liveclass',
  templateUrl: './liveclass.component.html',
  styleUrls: ['./liveclass.component.css']
})
export class LiveclassComponent implements OnInit {
  viewTeacherVideo: boolean;
  viewTeacherScreen: boolean;
  peerConnection;
  roomToJoin;
  @ViewChild('teacherScreen') teacherScreen: any;
  @ViewChild('teacherVideo') teacherVideo: any;
  @ViewChild('myVideo') myVideo: any;
  channel: any;
  database: any;
  pc: RTCPeerConnection;

  connection;

  constructor(
    private _student: StudentService,
    private _shared: SharedService,
    private _afDb: AngularFireDatabase
  ) {}

  ngOnInit() {}

  // setup() {
  //   this.connection = new RTCMultiConnection();

  //   // by default, socket.io server is assumed to be deployed on your own URL
  //   this.connection.socketURL = '/';

  //   // comment-out below line if you do not have your own socket.io server
  //   // connection.socketURL = 'https://rtcmulticonnection.herokuapp.com:443/';

  //   this.connection.socketMessageEvent = 'video-broadcast-demo';

  //   this.connection.session = {
  //     audio: true,
  //     video: true,
  //     oneway: true
  //   };

  //   this.connection.sdpConstraints.mandatory = {
  //     OfferToReceiveAudio: false,
  //     OfferToReceiveVideo: false
  //   };
  // }

  // joinClass() {
  //   this._shared.getOffer(this.roomToJoin).subscribe(
  //     answer => {
  //       console.log(answer);
  //     },
  //     error => console.error(error)
  //   );
  // }

  // initRtc() {
  //   this.getMediaStream()
  //     .then(stream => {
  //       console.log(stream);
  //       this.myVideo.nativeElement.srcObject = stream;
  //       this.createPeerConnection()
  //         .then(connection => {
  //           console.log(connection);

  //           this._shared
  //             .getOffer(this.roomToJoin)
  //             .pipe(take(1))
  //             .subscribe(
  //               offer => {
  //                 console.log(offer);
  //                 this.readMessage(offer[0].data);
  //               },
  //               error => console.error(error)
  //             );

  //           this.createOffer()
  //             .then(async offer => {
  //               console.log(offer);
  //               await this.addOfferToPeerConnection(offer);
  //               this.peerConnection.onaddstream = event =>
  //                 (this.teacherVideo.nativeElement.srcObject = event.stream);
  //             })
  //             .catch(error => console.error(error));
  //         })
  //         .catch(error => console.error(error));
  //     })
  //     .catch(error => console.error(error));
  // }

  // getMediaStream() {
  //   return new Promise((resolve, reject) => {
  //     navigator.mediaDevices
  //       .getUserMedia({ audio: true, video: true })
  //       .then(stream => {
  //         resolve(stream);
  //       })
  //       .catch(error => {
  //         console.error(error);
  //         reject(error);
  //       });
  //   });
  // }

  // createPeerConnection() {
  //   return new Promise((resolve, reject) => {
  //     this.peerConnection = new webkitRTCPeerConnection(SERVERS);
  //     resolve(this.peerConnection);
  //   });
  // }

  // createOffer() {
  //   return this.peerConnection.createOffer();
  // }

  // addOfferToPeerConnection(offer) {
  //   return this.peerConnection.setLocalDescription(offer);
  // }

  // createAnswer() {
  //   return this.peerConnection.createAnswer();
  // }

  // readMessage(data) {
  //   console.log(data);
  //   var msg = JSON.parse(data.offer);
  //   var sender = data.senderId;
  //   console.log(msg, sender);
  //   if (sender == this.roomToJoin) {
  //     console.log('sender != this.roomToJoin', sender != this.roomToJoin);
  //     if (msg.ice != undefined) {
  //       console.log('msg.ice != undefined', msg.ice != undefined);
  //       this.peerConnection.addIceCandidate(new RTCIceCandidate(msg.ice));
  //     } else if (msg.type == 'offer') {
  //       console.log('msg.type == offer', msg.type == 'offer');
  //       // this.peerConnection
  //       // .setRemoteDescription(new RTCSession)
  //       //   .createAnswer()
  //       //   .then(answer => {
  //       //     this.peerConnection.setLocalDescription(answer);
  //       //   })
  //       //   .then(res => {
  //       //     console.log(res);
  //       //   });
  //       this.peerConnection
  //         .setRemoteDescription(new RTCSessionDescription(msg))
  //         .then(() => this.peerConnection.createAnswer())
  //         .then(answer => this.peerConnection.setLocalDescription(answer))
  //         .then(res => {
  //           console.log(res);
  //           // sendMessage(
  //           //   yourId,
  //           //   JSON.stringify({ sdp: this.peerConnection.localDescription })
  //           // );
  //         });
  //     } else if (msg.sdp.type == 'answer') {
  //       console.log('msg.sdp.type == answer', msg.sdp.type == 'answer');
  //       this.peerConnection.setRemoteDescription(
  //         new RTCSessionDescription(msg.sdp)
  //       );
  //     }
  //   }
  // }

  // setupWebRtc() {
  //   // this.roomToJoin = this.guid();
  //   var channelName = '/webrtc';
  //   this.channel = this._afDb.list(channelName);
  //   this.database = this._afDb.database.ref(channelName);

  //   this.database.on('child_added', this.readMessage.bind(this));
  //   this.pc = new RTCPeerConnection(SERVERS, DEFAULT_CONSTRAINTS);
  //   this.pc.onicecandidate = event =>
  //     event.candidate
  //       ? this.sendMessage(
  //           this.roomToJoin,
  //           JSON.stringify({ ice: event.candidate })
  //         )
  //       : console.log('Sent All Ice');

  //   this.pc.ontrack = event =>
  //     (this.teacherVideo.nativeElement.srcObject = event.streams[0]); // use ontrack

  //   this.showMe();
  // }

  // sendMessage(roomToJoin, data) {
  //   var msg = this.channel.push({
  //     sender: roomToJoin,
  //     message: data
  //   });
  //   msg.remove();
  // }

  // readMessage(data) {
  //   if (!data) return;
  //   var msg = JSON.parse(data.val().message);
  //   var sender = data.val().sender;
  //   if (sender != this.roomToJoin) {
  //     if (msg.ice != undefined)
  //       this.pc.addIceCandidate(new RTCIceCandidate(msg.ice));
  //     else if (msg.sdp.type == 'offer')
  //       this.pc
  //         .setRemoteDescription(new RTCSessionDescription(msg.sdp))
  //         .then(() => this.pc.createAnswer())
  //         .then(answer => this.pc.setLocalDescription(answer))
  //         .then(() =>
  //           this.sendMessage(
  //             this.roomToJoin,
  //             JSON.stringify({ sdp: this.pc.localDescription })
  //           )
  //         );
  //     else if (msg.sdp.type == 'answer')
  //       this.pc.setRemoteDescription(new RTCSessionDescription(msg.sdp));
  //   }
  // }

  // showMe() {
  //   navigator.mediaDevices
  //     .getUserMedia({ audio: true, video: true })
  //     .then(stream => (this.myVideo.nativeElement.srcObject = stream))
  //     .then(stream =>
  //       stream.getTracks().forEach(track => {
  //         this.pc.addTrack(track);
  //       })
  //     );
  // }

  // showRemote() {
  //   this.pc
  //     .createOffer()
  //     .then(offer => this.pc.setLocalDescription(offer))
  //     .then(() =>
  //       this.sendMessage(
  //         this.roomToJoin,
  //         JSON.stringify({ sdp: this.pc.localDescription })
  //       )
  //     );
  // }

  // guid() {
  //   return (
  //     this.s4() +
  //     this.s4() +
  //     '-' +
  //     this.s4() +
  //     '-' +
  //     this.s4() +
  //     '-' +
  //     this.s4() +
  //     '-' +
  //     this.s4() +
  //     this.s4() +
  //     this.s4()
  //   );
  // }

  // s4() {
  //   return Math.floor((1 + Math.random()) * 0x10000)
  //     .toString(16)
  //     .substring(1);
  // }
}
