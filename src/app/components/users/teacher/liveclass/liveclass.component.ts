import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { TeacherService } from '../../../../utils/services/firestore/teacher/teacher.service';
import { SharedService } from '../../../../utils/services/firestore/shared/shared.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { AuthService } from '../../../../utils/services/auth/auth.service';

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
export class LiveclassComponent implements OnInit, OnDestroy {
  targetpeer: any;
  dataChannel: any;
  peer: any;
  server: any = null;
  n = <any>navigator;
  initiatorOffer: any;
  clientanswer: any;
  recieveanswer: any;
  expectanswer: boolean = false;
  @ViewChild('friendsVideo') friendsVideo: any;
  @ViewChild('myVideo') myVideo: any;
  turnReady: boolean;
  localvideostream: any;
  friendsVideostream: any;
  pcConfig = {
    iceServers: [
      {
        urls: 'stun:stun.l.google.com:19302',
        credential: ''
      }
    ]
  };
  roomToCreate = '92';
  approvedRequests: {};
  classrooms = [];
  students;
  academyId;
  classroomId;
  studentsCount: number;
  questions;
  newRequest;

  constructor(private _shared: SharedService, private _auth: AuthService) {}

  ngOnInit() {
    this._auth.user.subscribe(async user => {
      await this.getApprovedRequests().then(requests => {
        this.approvedRequests = requests;
        console.log(this.approvedRequests);
      });
      // this.approvedRequests.forEach(requests => {
      //   requests.forEach(request => {
      //     console.log(request);
      //     // this.getAcademyData(request);
      //   });
      // });
    });

    this.n.getUserMedia =
      this.n.getUserMedia ||
      this.n.webkitGetUserMedia ||
      this.n.mozGetUserMedia ||
      this.n.msGetUserMedia;
    this.n.getUserMedia(
      { video: true, audio: true },
      stream => {
        this.localstream(stream);
      },
      () => {}
    );

    if (location.hostname !== 'localhost') {
      this.requestTurn(
        'https://computeengineondemand.appspot.com/turn?username=41784574&key=4080218913'
      );
    }
    //////////////////////////////////////
    this.peer = new RTCPeerConnection(this.pcConfig);
    this.peer.onaddstream = this.handleRemoteStreamAdded;
    this.peer.onicecandidate = this.sendIcecandidates;
    setTimeout(() => {
      console.log(this.localvideostream);
      this.peer.addStream(this.localvideostream);
      console.log('local stream added');
    }, 1000);

  }

  ngOnDestroy(): void {
    this.peer = undefined;
    this.informStudentsOfEndClass();
  }

  informStudentsOfEndClass() {
    if (!this.students) return;
    this.students.forEach(student => {
      console.log(student);
      console.log(student.studentId);
      this._shared.liveclassFinished(student.studentId);
    });
  }

  getAcademyData(academyId) {
    console.log(academyId);
    return new Promise((resolve, reject) => {
      this._shared.getTeacherClassrooms(academyId).subscribe(classrooms => {
        resolve(classrooms);
        // this.classrooms.push(classrooms);
        // console.log(this.classrooms);
      });
    });
  }

  getApprovedRequests() {
    var temp = [];
    return new Promise((resolve, reject) => {
      {
        this._shared.getUserRequests().subscribe(userInfo => {
          if (!userInfo['requests']) return;
          userInfo['requests'].forEach(async request => {
            await this._shared
              .getApprovedRequests(request.academyId)
              .subscribe(request => {
                temp.push(request);
              });
          });
          resolve(temp);
        });
      }
    });
  }

  endClass() {
    this._shared
      .endLiveClassByTeacher(this.academyId, this.classroomId)
      .then(res => {
        this.informStudentsOfEndClass();
      });
  }

  givePermission(permit) {
    this._shared
      .givePermission(
        permit,
        this.academyId,
        this.classroomId,
        this.newRequest.studentId
      )
      .then(res => {
        console.log(res);
        // this.newRequest = undefined;
      });
  }

  initConnection(academy?) {
    this.n.getUserMedia =
      this.n.getUserMedia ||
      this.n.webkitGetUserMedia ||
      this.n.mozGetUserMedia ||
      this.n.msGetUserMedia;
    this.n.getUserMedia(
      { video: true, audio: true },
      stream => {
        this.localstream(stream);
      },
      () => {}
    );

    if (location.hostname !== 'localhost') {
      this.requestTurn(
        'https://computeengineondemand.appspot.com/turn?username=41784574&key=4080218913'
      );
    }
    //////////////////////////////////////
    this.peer = new RTCPeerConnection(this.pcConfig);
    this.peer.onaddstream = this.handleRemoteStreamAdded;
    this.peer.onicecandidate = this.sendIcecandidates;
    setTimeout(() => {
      console.log(this.localvideostream);
      this.peer.addStream(this.localvideostream);
      console.log('local stream added');
      console.log(academy);
      // this.approvedRequests.forEach(requests => {
      //   requests.forEach(request => {
      //     console.log(request);
      // this.getAcademyData(academy.data.academyId).then(classrooms => {
      //   console.log(classrooms);
      //   console.log(classrooms[0]);
      //   this.academyId = academy.data.academyId;
      //   this.classroomId = classrooms[0].id;
      //   this._shared
      //     .startLiveClass(academy.data.academyId, classrooms[0].id)
      //     .then(liveClass => {
      //       console.log(liveClass);
      //       this.students = classrooms[0].data.students;
      //       this.students.forEach(student => {
      //         console.log(student);
      //         this._shared
      //           .studentsInClassroom(this.academyId, this.classroomId)
      //           .subscribe(students => {
      //             console.log(students);
      //             this.studentsCount = students.length;
      //             this._shared
      //               .subscribeToQuestions(this.academyId, this.classroomId)
      //               .subscribe(questions => {
      //                 console.log(questions);
      //                 console.log(questions[this.questions ? this.questions.length : 0]);
      //                 this.newRequest =
      //                   questions[this.questions ? this.questions.length : 0];
      //                 this.questions = questions;
      //                 console.log(this.questions);
      //               });
      //           });
      //         this._shared.informStudentsOfClassroom(
      //           student.studentId,
      //           academy.data.academyId,
      //           classrooms[0].id
      //         );
      //       });
      //     });
      // });
      //   });
      // });
    }, 1000);
    // for video chat and voice chat

    // // recieve teacher offer
    // this._shared.getOffer(this.roomToCreate).subscribe(data => {
    //   console.log(data);
    //   // this.peer.setRemoteDescription(new RTCSessionDescription(data), () => {});
    //   this.peer.createAnswer().then(this.localDescCreated);
    // });
    // recieve answer  from student
    this._shared.getAnswer(this.roomToCreate).subscribe(data => {
      console.log(data);
      var msg = JSON.parse(data[0]['data']['answer']);
      this.peer.setRemoteDescription(new RTCSessionDescription(msg), () => {});
    });

    this._shared.getAnswerCandidate(this.roomToCreate).subscribe(data => {
      console.log('Recieved candidate');
      // let values = Object.keys(data).map(key => data[key]);
      this.peer.addIceCandidate(
        new RTCIceCandidate({
          candidate: data.data().candidate.candidate
        })
      );
      // if (location.hash != '#init') {
      this.peer.ondatachannel = function(event) {
        var channel = event.channel;
        channel.onopen = function(event) {
          console.log('channelopened');
          channel.send('Hi back!');
        };
        channel.onmessage = function(event) {
          console.log('messege arrived');

          console.log(event.data);
        };
      };
      // }
    });
  }

  //!&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
  //!&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
  //!&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
  //!&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
  //!&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

  sendOffer() {
    this.peer = new RTCPeerConnection(this.pcConfig);
    this.peer.addStream(this.localvideostream);
    this.peer.createOffer().then(this.localDescCreated);
    this.peer.onaddstream = this.handleRemoteStreamAdded;
    this.peer.onicecandidate = this.sendIcecandidates;
  }
  // receiveOffer() {}
  sendCandidate() {}
  // receiveCandidate() {}
  sendMediaStreamObject() {}
  // receiveMediaStreamObject() {}

  //!&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
  //!&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
  //!&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
  //!&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
  //!&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  requestTurn(turnURL) {
    var turnExists = false;
    for (var i in this.pcConfig.iceServers) {
      if (this.pcConfig.iceServers[i].urls.substr(0, 5) === 'turn:') {
        turnExists = true;
        this.turnReady = true;
        break;
      }
    }
    if (!turnExists) {
      console.log('Getting TURN server from ', turnURL);
      // No TURN server. Get one from computeengineondemand.appspot.com:
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
          var turnServer = JSON.parse(xhr.responseText);
          console.log('Got TURN server: ', turnServer);
          this.pcConfig.iceServers.push({
            urls: 'turn:' + turnServer.username + '@' + turnServer.turn,
            credential: turnServer.password
          });
          this.turnReady = true;
        }
      };
      xhr.open('GET', turnURL, true);
      xhr.send();
    }
  }

  localstream(stream) {
    console.log('got local stream');

    this.localvideostream = stream;
    let video = this.myVideo.nativeElement;
    video.srcObject = stream;
  }

  //creating the WEB-RTC session
  creatingWebRtcConnection() {
    this.peer = new RTCPeerConnection(this.pcConfig);
    this.peer.addStream(this.localvideostream);
    this.peer.createOffer().then(this.localDescCreated);
    this.peer.onaddstream = this.handleRemoteStreamAdded;
    this.peer.onicecandidate = this.sendIcecandidates;
  }
  sendIcecandidates = event => {
    console.log(event);
    if (event.candidate) {
      console.log('Sending Ice candidate');
      this._shared.sendOfferCandidate(this.roomToCreate, {
        type: 'candidate',
        label: event.candidate.sdpMLineIndex,
        id: event.candidate.sdpMid,
        candidate: event.candidate.candidate
      });
    } else {
      console.log('End of candidates.');
    }
  };
  handleRemoteStreamAdded = event => {
    console.log('got remort stream');
    console.log(event.stream);
    this.friendsVideo.nativeElement.srcObject = event.stream;
    // let video1 = this.friendsVideo.nativeElement;
    // console.log(event.stream);
    // var str = event.stream;
    // video1.srcObject = str;
  };
  localDescCreated = desc => {
    console.log(desc);
    this.peer.setLocalDescription(desc, () => {
      if (desc.type === 'offer') {
        //  send ooofer message
        this._shared.sendOffer(this.roomToCreate, desc);
      }
      if (desc.type === 'answer') {
      }
    });
  };
}
