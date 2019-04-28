import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, FormArray, Validators } from "@angular/forms";
import { SharedService } from "../../../../utils/services/firestore/shared/shared.service";
import { AuthService } from "../../../../utils/services/auth/auth.service";
import { TeacherService } from "../../../../utils/services/firestore/teacher/teacher.service";
import { MatSnackBar } from '@angular/material';
@Component({
  selector: "app-makequiz",
  templateUrl: "./makequiz.component.html",
  styleUrls: ["./makequiz.component.css"]
})
export class MakequizComponent implements OnInit {
  classes;
  subjects = [];
  quizForm: FormGroup;
  classrooms: any;
  approvedRequests = [];
  allAssignments;
  academy;
  classroom;

  constructor(
    private formBuilder: FormBuilder,
    private _shared: SharedService,
    private _auth: AuthService,
    private _teacher: TeacherService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    // this._auth.user.subscribe(user => {
    //   this._shared.getUserRequests().subscribe(userInfo => {
    //     console.log(userInfo);
    //     this.classes = [];
    //     if (!userInfo['requests']) return;
    //     userInfo['requests'].forEach(async academy => {
    //       console.log(academy);
    //       if (academy.length == 0) return;
    //       await this._shared
    //         .getApprovedRequests(academy.academyId)
    //         .subscribe(request => {
    //           if (request.length != 0) {
    //             this.classes.push(request);
    //           }
    //         });
    //     });
    //     console.log(this.classes);
    //   });
    // });
    this._auth.user.subscribe(user => {
      this._shared.getUserRequests().subscribe(user => {
        if (!user["requests"]) return;
        user["requests"].forEach(academy => {
          console.log(academy);

          this._shared
            .getApprovedRequests(academy.academyId)
            .subscribe(request => {
              console.log(request);

              if (!request) return;
              if (request.length > 0) {
                this.approvedRequests.push(request);
                console.log(request);
              }
            });
        });
      });
    });
    this.quizForm = this.formBuilder.group({
      className: 0,
      subject: [""],
      title: ["", Validators.required],
      duration: [10, Validators.required],
      totalMarks: [0, Validators.required],
      status: ["saved", Validators.required],
      academyName: ["", Validators.required],
      academyId: "",
      classroomId: "",
      postedOn: "",
      dueDate: "",
      questions: this.formBuilder.array([this.initQuestion()])
    });
    this.subject.disable();
  }

  get subject() {
    return this.quizForm.get("subject");
  }
  get academyName() {
    return this.quizForm.get("academyName");
  }
  get academyId() {
    return this.quizForm.get("academyId");
  }
  get classroomId() {
    return this.quizForm.get("classroomId");
  }
  get postedOn() {
    return this.quizForm.get("postedOn");
  }
  get duration() {
    return this.quizForm.get("duration");
  }
  get dueDate() {
    return this.quizForm.get("dueDate");
  }

  getAcademyData(academyId) {
    console.log(academyId);
    this._shared.getTeacherClassrooms(academyId).subscribe(classrooms => {
      this.classrooms = classrooms;
      console.log(this.classrooms);
    });
  }

  selectClassroom(classroom) {
    this.subject.setValue(classroom.data.subject.subjectName);
  }

  getQuizzes(classroomId) {
    console.log(classroomId);
  }

  get className() {
    return this.quizForm.get("className");
  }

  initQuestion() {
    return this.formBuilder.group({
      text: ["", Validators.required],
      type: ["mcq", Validators.required],
      mcqOptions: this.formBuilder.array([
        this.initMcqOption(),
        this.initMcqOption()
      ]),
      mcqCorrectOption: null,
      tfCorrectOption: null
    });
  }

  initMcqOption() {
    const group = this.formBuilder.group({
      option: [""]
    });
    return group;
  }

  getQuestions(form) {
    return form.controls.questions.controls;
  }
  getMcqOptions(form) {
    return form.controls.mcqOptions.controls;
  }

  addQuestion() {
    const control = <FormArray>this.quizForm.get("questions");
    control.push(this.initQuestion());
  }

  updateCorrectMcqOption(questionNumber, correctOptionNumber) {
    const question = this.quizForm.get([
      "questions",
      questionNumber
    ]) as FormArray;
    question.controls["mcqCorrectOption"].setValue(correctOptionNumber);
  }

  addMcqOption(questionNumber) {
    const control = this.quizForm.get([
      "questions",
      questionNumber,
      "mcqOptions"
    ]) as FormArray;
    control.push(this.initMcqOption());
  }

  deleteQuestion(questionNumber) {
    const control = this.quizForm.get(["questions"]) as FormArray;
    control.removeAt(questionNumber);
  }

  deleteOption(questionNumber, optionNumber) {
    const control = this.quizForm.get([
      "questions",
      questionNumber,
      "mcqOptions"
    ]) as FormArray;
    control.removeAt(optionNumber);
  }

  saveQuiz() {
    // if (!this.academyId) {
    //   return alert('Choose an academy first!');
    // }
    // if (!this.classroomId) {
    //   return alert('Choose a subject first!');
    // }
    this.className.setValue(this.classroom.data.class.className);
    this.academyName.setValue(this.academy.data.academyName);
    this.academyId.setValue(this.academy.data.academyId);
    this.classroomId.setValue(this.classroom.id);
    this.postedOn.setValue(new Date());
    // console.log(this.academyId);
    // console.log(this.classroomId);
    console.log(this.quizForm.value);

    // this._teacher.createQuiz(
    //   this.quizForm.value,
    //   this.qacademyId,
    //   this.qclassroomId
    // );
    this._teacher
      .createQuiz(
        this.academyId.value,
        this.classroomId.value,
        this.quizForm.value
      )
      .then(res => {
        this.showSnackBar(`Quiz has been posted!`, "bg-success");
      });
  }

  showSnackBar(message, style) {
    this._snackBar.open(message, "X", {
      duration: 4000,
      panelClass: style
    });
  }
}
