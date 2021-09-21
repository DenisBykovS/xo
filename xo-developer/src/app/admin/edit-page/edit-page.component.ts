import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {PostService} from "../post.service";
import {Post} from "../../shared/interfaces";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit {

  @ViewChild('input', {static: false}) inputRef: ElementRef
  form: FormGroup
  image: File
  imagePrev
  idPost : string
  textValidator: string
  post: Post

  constructor(private route: ActivatedRoute,
              private router: Router,
              private postService: PostService) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.editPost(params.id)
      this.idPost = params.id
    })
    this.form =new FormGroup({
      text: new FormControl('', Validators.required)
    })
  }

  editPost(id) {
      this.postService.getById(id).subscribe((post) => {
        this.post = post
        this.textValidator = this.post.text
      })
  }

  updatePost(){
    this.form.disable()

    this.postService.updatePost(this.idPost, this.form.value.text, this.image).subscribe(() => {
      this.form.enable()
      this.router.navigate(['/admin', 'dashboard'])
    }, () => {
      this.form.enable()
    })
  }

  trigger() {
    this.inputRef.nativeElement.click()
  }

  onFileUpload(event: any) {
    const file = event.target.files[0]
    this.image = file

    const reader = new FileReader()

    reader.onload = () => {
      this.imagePrev = reader.result
    }

    reader.readAsDataURL(file)
  }

}
