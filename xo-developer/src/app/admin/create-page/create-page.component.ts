import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {PostService} from "../post.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss']
})
export class CreatePageComponent implements OnInit {

  @ViewChild('input', {static: false}) inputRef: ElementRef
  form: FormGroup
  image: File
  imagePrev

  constructor(private postService: PostService, private router: Router) { }

  ngOnInit() {
    this.form =new FormGroup({
      text: new FormControl('', Validators.required)
    })
  }

  addPost(){
    this.form.disable()

    this.postService.createPost(this.form.value.text, this.image).subscribe(() => {
      this.form.enable()
      this.router.navigate(['/admin','dashboard'])
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
