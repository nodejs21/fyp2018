import { Component, OnInit, ViewChild } from '@angular/core';
import { TeacherService } from '../../../../utils/services/firestore/teacher/teacher.service';
import { SharedService } from '../../../../utils/services/firestore/shared/shared.service';
import { AngularFireDatabase } from '@angular/fire/database';

const SERVERS: any = {
  iceServers: [
    { urls: 'stun:stun.services.mozilla.com' },
    { urls: 'stun:stun.l.google.com:19302' }
  ]
};

const DEFAULT_CONSTRAINTS = {
  optional: []
};

declare let RTCPeerConnection: any;

@Component({
  selector: 'app-liveclass',
  templateUrl: './liveclass.component.html',
  styleUrls: ['./liveclass.component.css']
})
export class LiveclassComponent implements OnInit {
  peerConnection;
  roomToCreate;
  displayMyVideo: boolean;
  displayFriendsVideo: boolean;
  @ViewChild('friendsVideo') friendsVideo: any;
  @ViewChild('myVideo') myVideo: any;
  channel: any;
  database: any;
  constructor(
    private _shared: SharedService,
    private _afDb: AngularFireDatabase
  ) {}

  ngOnInit() {}

  initRtc() {
    this.getMediaStream()
      .then(stream => {
        console.log(stream);
        this.myVideo.nativeElement.srcObject = stream;
        this.createPeerConnection()
          .then(connection => {
            console.log(connection);
            this.createOffer()
              .then(async offer => {
                console.log(offer);
                await this.addOfferToPeerConnection(offer);
                this._shared
                  .sendOffer(this.roomToCreate, offer)
                  .then(res => {
                    console.log(res);
                  })
                  .catch(error => console.error(error));
                // this.addOfferToPeerConnection(offer)
                //   .then(response => {
                //     console.log(response);
                //   })
                //   .catch(error => console.error(error));

                // this.createAnswer()
                //   .then(answer => {
                //     console.log(answer);
                //   })
                //   .catch(error => console.error(error));
              })
              .catch(error => console.error(error));
          })
          .catch(error => console.error(error));
      })
      .catch(error => console.error(error));
  }

  getMediaStream() {
    return new Promise((resolve, reject) => {
      navigator.mediaDevices
        .getUserMedia({ audio: true, video: true })
        .then(stream => {
          resolve(stream);
        })
        .catch(error => {
          console.error(error);
          reject(error);
        });
    });
  }

  createPeerConnection() {
    return new Promise((resolve, reject) => {
      this.peerConnection = new webkitRTCPeerConnection(SERVERS);
      resolve(this.peerConnection);
    });
  }

  createOffer() {
    return this.peerConnection.createOffer();
  }

  addOfferToPeerConnection(offer) {
    return this.peerConnection.setLocalDescription(offer);
  }

  createAnswer() {
    return this.peerConnection.createAnswer();
  }

  //! ********************************************************************************

  // ngOnInit() {
  //   this.database = this._afDb.database.ref();
  //   this.database.on('child_added', this.readMessage);
  //   var servers = {
  //     iceServers: [
  //       { urls: 'stun:stun.services.mozilla.com' },
  //       { urls: 'stun:stun.l.google.com:19302' },
  //       {
  //         urls: 'turn:numb.viagenie.ca',
  //         credential: 'webrtc',
  //         username: 'websitebeaver@mail.com'
  //       }
  //     ]
  //   };
  //   this.peerConnection = new RTCPeerConnection(servers);
  //   this.peerConnection.onicecandidate = event =>
  //     event.candidate
  //       ? this.sendMessage(
  //           this.roomToCreate,
  //           JSON.stringify({ ice: event.candidate })
  //         )
  //       : console.log('Sent All Ice');
  //   this.peerConnection.onaddstream = event =>
  //     (this.friendsVideo.nativeElement.srcObject = event.stream);
  //   this.showMyFace();
  // }

  // sendMessage(senderId, data) {
  //   var msg = this.database.push({ sender: senderId, message: data });
  //   msg.remove();
  // }

  // readMessage(data) {
  //   var msg = JSON.parse(data.val().message);
  //   var sender = data.val().sender;
  //   if (sender != this.roomToCreate) {
  //     if (msg.ice != undefined)
  //       this.peerConnection.addIceCandidate(new RTCIceCandidate(msg.ice));
  //     else if (msg.sdp.type == 'offer')
  //       this.peerConnection
  //         .setRemoteDescription(new RTCSessionDescription(msg.sdp))
  //         .then(() => this.peerConnection.createAnswer())
  //         .then(answer => this.peerConnection.setLocalDescription(answer))
  //         .then(() =>
  //           this.sendMessage(
  //             this.roomToCreate,
  //             JSON.stringify({ sdp: this.peerConnection.localDescription })
  //           )
  //         );
  //     else if (msg.sdp.type == 'answer')
  //       this.peerConnection.setRemoteDescription(
  //         new RTCSessionDescription(msg.sdp)
  //       );
  //   }
  // }

  // showMyFace() {
  //   navigator.mediaDevices
  //     .getUserMedia({ audio: true, video: true })
  //     .then(stream => (this.myVideo.nativeElement.srcObject = stream))
  //     .then(stream => this.peerConnection.addStream(stream));
  // }

  // showFriendsFace() {
  //   this.peerConnection
  //     .createOffer()
  //     .then(offer => this.peerConnection.setLocalDescription(offer))
  //     .then(() =>
  //       this.sendMessage(
  //         this.roomToCreate,
  //         JSON.stringify({ sdp: this.peerConnection.localDescription })
  //       )
  //     );
  // }

  //! ********************************************************************************

  // peerConnection;
  // roomToCreate;
  // displayMyVideo: boolean;
  // displayFriendsVideo: boolean;
  // @ViewChild('friendsVideo') friendsVideo: any;
  // @ViewChild('myVideo') myVideo: any;
  // channel: any;
  // database: any;

  // setupWebRtc() {
  //   // this.roomToCreate = this.guid();
  //   var channelName = '/webrtc';
  //   this.channel = this._afDb.list(channelName);
  //   this.database = this._afDb.database.ref(channelName);

  //   this.database.on('child_added', this.readMessage.bind(this));
  //   this.peerConnection = new RTCPeerConnection(SERVERS, DEFAULT_CONSTRAINTS);
  //   this.peerConnection.onicecandidate = event =>
  //     event.candidate
  //       ? this.sendMessage(
  //           this.roomToCreate,
  //           JSON.stringify({ ice: event.candidate })
  //         )
  //       : console.log('Sent All Ice');

  //   this.peerConnection.ontrack = event =>
  //     (this.friendsVideo.nativeElement.srcObject = event.streams[0]); // use ontrack

  //   this.showMe();
  // }

  // sendMessage(roomToCreate, data) {
  //   var msg = this.channel.push({
  //     sender: roomToCreate,
  //     message: data
  //   });
  //   msg.remove();
  // }

  // readMessage(data) {
  //   console.log(data);

  //   if (!data) return;
  //   var msg = JSON.parse(data.val().message);
  //   var sender = data.val().sender;
  //   if (sender != this.roomToCreate) {
  //     if (msg.ice != undefined)
  //       this.peerConnection.addIceCandidate(new RTCIceCandidate(msg.ice));
  //     else if (msg.sdp.type == 'offer')
  //       this.peerConnection
  //         .setRemoteDescription(new RTCSessionDescription(msg.sdp))
  //         .then(() => this.peerConnection.createAnswer())
  //         .then(answer => this.peerConnection.setLocalDescription(answer))
  //         .then(() =>
  //           this.sendMessage(
  //             this.roomToCreate,
  //             JSON.stringify({ sdp: this.peerConnection.localDescription })
  //           )
  //         );
  //     else if (msg.sdp.type == 'answer')
  //       this.peerConnection.setRemoteDescription(
  //         new RTCSessionDescription(msg.sdp)
  //       );
  //   }
  // }

  // showMe() {
  //   navigator.mediaDevices
  //     .getUserMedia({ audio: true, video: true })
  //     .then(stream => (this.myVideo.nativeElement.srcObject = stream))
  //     .then(stream =>
  //       stream.getTracks().forEach(track => {
  //         this.peerConnection.addTrack(track);
  //       })
  //     );
  // }

  // showRemote() {
  //   this.peerConnection
  //     .createOffer()
  //     .then(offer => this.peerConnection.setLocalDescription(offer))
  //     .then(() =>
  //       this.sendMessage(
  //         this.roomToCreate,
  //         JSON.stringify({ sdp: this.peerConnection.localDescription })
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

  // ! ***************************************************************************************

  // setUp() {
  //   var servers = {
  //     iceServers: [
  //       { urls: 'stun:stun.services.mozilla.com' },
  //       { urls: 'stun:stun.l.google.com:19302' }
  //     ]
  //   };
  //   // this.peerConnection = new webkitRTCPeerConnection(servers);
  //   this.showMyVideo();
  //   this.peerConnection = new RTCPeerConnection(servers);
  //   this.showFriendsFace();
  //   console.log(this.peerConnection);
  //   console.log(this.peerConnection.onicecandidate);

  //   this.peerConnection.onicecandidate = event => {
  //     console.log(event.candidate);
  //     event.candidate
  //       ? this.sendMessage(
  //           this.roomToCreate,
  //           JSON.stringify({ ice: event.candidate })
  //         )
  //       : console.log('Send all ICE.');
  //   };

  //   // this.sendMessage(this.roomToCreate, {});

  //   this.peerConnection.ontrack = event => {
  //     console.log(event.streams);
  //     this.friendsVideo.nativeElement.srcObject = event.streams;
  //   };
  //   // navigator.mediaDevices
  //   //   .getUserMedia({ audio: true, video: true })
  //   //   .then(stream => {
  //   //     stream.getTracks().forEach(track => {
  //   //       stream.addTrack(track);
  //   //     });
  //   //   });
  //   // peerConnection.createOffer().then(offer => peerConnection.setLocalDescription(offer));
  // }

  // showMyVideo() {
  //   this.displayMyVideo = true;
  //   navigator.mediaDevices
  //     .getUserMedia({ audio: true, video: true })
  //     .then(stream => (this.myVideo.nativeElement.srcObject = stream))
  //     .then(stream =>
  //       stream.getTracks().forEach(track => {
  //         stream.addTrack(track);
  //       })
  //     );
  // }

  // showFriendsFace() {
  //   this.displayFriendsVideo = true;
  //   this.peerConnection
  //     .createOffer()
  //     .then(offer => this.peerConnection.setLocalDescription(offer))
  //     .then(() =>
  //       this.sendMessage(
  //         this.roomToCreate,
  //         JSON.stringify({ sdp: this.peerConnection.localDescription })
  //       )
  //     );
  // }

  // sendMessage(senderId, data) {
  //   this._shared
  //     .sendMessage(senderId, data)
  //     .then(msg => {
  //       console.log(msg);
  //     })
  //     .catch(error => console.error(error));
  //   // var msg = database.push({ sender: senderId, message: data });
  //   // msg.remove();
  // }

  // readMessage(data) {
  //   var msg = JSON.parse(data.val().message);
  //   var sender = data.val().sender;
  //   if (sender != this.roomToCreate) {
  //     if (msg.ice != undefined)
  //       this.peerConnection.addIceCandidate(new RTCIceCandidate(msg.ice));
  //     else if (msg.sdp.type == 'offer')
  //       this.peerConnection
  //         .setRemoteDescription(new RTCSessionDescription(msg.sdp))
  //         .then(() => this.peerConnection.createAnswer())
  //         .then(answer => this.peerConnection.setLocalDescription(answer))
  //         .then(() =>
  //           this.sendMessage(
  //             this.roomToCreate,
  //             JSON.stringify({ sdp: this.peerConnection.localDescription })
  //           )
  //         );
  //     else if (msg.sdp.type == 'answer')
  //       this.peerConnection.setRemoteDescription(
  //         new RTCSessionDescription(msg.sdp)
  //       );
  //   }
  // }
}
