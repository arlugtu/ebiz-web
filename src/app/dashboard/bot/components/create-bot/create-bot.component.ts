import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import Stepper from 'bs-stepper';
import { HttpService } from '../../services/http.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-bot',
  templateUrl: './create-bot.component.html',
  styleUrls: ['./create-bot.component.scss']
})
export class CreateBotComponent implements OnInit {
  @ViewChild('myPond') myPond: any;
  pondOptions = {
    class: 'my-filepond',
    multiple: false,
    labelIdle: 'Drop file here',
    acceptedFileTypes: 'image/jpeg, image/png',
  };
  pondFiles = [];
  private stepper: Stepper;
  public voicesList: any = [];
  public audioTrack: any = null;
  base64Image: string = '';
  pipe = new DatePipe('en-US');
  public showLoader = false;
  public isEdit = false;
  public isPlay = false;
  public audioPlayer = '';
  public showPlayer = false;

  public personalityType = [
    {
      name: 'Architect',
      value: 'INTJ-A/INTJ-T'
    },
    {
      name: 'Logician',
      value: 'INTP-A/INTO-T'
    },
    {
      name: 'Commander',
      value: 'ENTJ-A/ENTJ-T'
    },
    {
      name: 'Debater',
      value: 'ENTP-A/ENTP-T'
    },
    {
      name: 'Advocate',
      value: 'INFJ-A/INFJ-T'
    },
    {
      name: 'Mediator',
      value: 'INFP-A/INFP-T'
    },
    {
      name: 'Protagonist',
      value: 'ENFJ-A/ENFJ-A'
    },
    {
      name: 'Campaigner',
      value: 'ENFP-A/ENFP-T'
    },
    {
      name: 'Logistician',
      value: 'ISTJ-A/ISTJ-T'
    },
    {
      name: 'Defender',
      value: 'ISFJ-A/ISFJ-T'
    },
    {
      name: 'Executive',
      value: 'ESTJ-A/ESTJ-T'
    },
    {
      name: 'Consul',
      value: 'ESFJ-A/ESFJ-T'
    },
    {
      name: 'Virtuoso',
      value: 'ISTP-A/ISTP-T'
    },
    {
      name: 'Adventurer',
      value: 'ISFPA-A/ISFP-T'
    },
    {
      name: 'Entrepreneur',
      value: 'ESTP-A/ESTP-T'
    },
    {
      name: 'Entertainer',
      value: 'ESFP-A/ESFP-T'
    }
  ]

  public collarSize = [
    {
      name: 'Extra Small',
      size: 'Extra Small (ES)'
    },
    {
      name: 'Small',
      size: 'Small (S)'
    },
    {
      name: 'Medium',
      size: 'Medium (M)'
    },
    {
      name: 'Large',
      size: 'Large (L)'
    },
    {
      name: 'Extra Large',
      size: 'Extra Large (EL)'
    }
  ]
  public botType = [
    {
      id: '1',
      name: 'sweet'
    },
    {
      id: '2',
      name: 'spicy'
    }
  ]

  constructor(
    private httpService: HttpService,
    private router: ActivatedRoute,
    private routers: Router
  ) { }

  ngOnInit(): void {
    this.stepper = new Stepper(document.querySelector('#createBotStepper'), {
      linear: false,
      animation: true
    });
    // this.httpService.getVoices().subscribe(response => {
    //   this.voicesList = response;
    //   this.showLoader = false;
    //   this.setFormData();
    // });
    this.createBotFormGroup.get('personal_details').get('voice').valueChanges.subscribe(voice_id => {
      if (voice_id != 'empty') {
        const voice = this.voicesList.filter(v => v.voice_id == voice_id)[0];
        this.audioTrack = {
          url: voice.preview_url,
          title: voice.name,
          cover: ''
        };
        this.audioPlayer = `<audio class="w-100" id="myAudio" controls style="background: #052c65 !important;"><source src="${this.audioTrack.url}" type="audio/mpeg">Your browser does not support the audio element.</audio>`;
        this.showPlayer = true;
      } else {
        this.showPlayer = false;
      }
    });
  }

  createBotFormGroup = new FormGroup({
    bot_name: new FormControl('', Validators.required),
    bot_username: new FormControl('', Validators.required),
    image_url: new FormControl(null, Validators.required),
    description: new FormControl('', Validators.required),
    about: new FormControl('', [Validators.required, Validators.maxLength(120)]),
    training_model: new FormControl('', Validators.required),
    bot_type: new FormControl('', Validators.required),
    bot_admin_command: new FormControl('', Validators.required),
    bot_admin_command_description: new FormControl('', Validators.required),
    verify_status: new FormControl(''),
    personal_details: new FormGroup({
      personality_type: new FormControl('', Validators.required),
      clothing_size: new FormControl('', Validators.required),
      shoulder_size: new FormControl('', Validators.required),
      bust_size: new FormControl('', Validators.required),
      waist_size: new FormControl('', Validators.required),
      hip_size: new FormControl('', Validators.required),
      shoe_size: new FormControl('', Validators.required),
      weight: new FormControl('', Validators.required),
      height: new FormControl('', Validators.required),
      birthday: new FormControl(new Date(), Validators.required),
      favorite_color: new FormControl('', Validators.required),
      voice: new FormControl('', Validators.required)
    })
  });

  stepperNext() {
    this.stepper.next();
  }

  stepperPrevious() {
    this.stepper.previous();
  }

  stepperSubmit() {
    this.showLoader = true;
    let payload = {
      bot_name: this.createBotFormGroup.value.bot_name,
      bot_username: this.createBotFormGroup.value.bot_username,
      description: this.createBotFormGroup.value.description,
      about: this.createBotFormGroup.value.about,
      image_url: this.base64Image,
      training_model: this.createBotFormGroup.value.training_model,
      bot_type: this.createBotFormGroup.value.bot_type,
      bot_admin_command: this.createBotFormGroup.value.bot_admin_command,
      bot_admin_command_description: this.createBotFormGroup.value.bot_admin_command_description,
      personal_details: {
        personality_type: this.createBotFormGroup.value.personal_details?.personality_type,
        clothing_size: this.createBotFormGroup.value.personal_details?.clothing_size,
        shoulder_size: `${this.createBotFormGroup.value.personal_details?.shoulder_size} cm`,
        bust_size: `${this.createBotFormGroup.value.personal_details?.bust_size} cm`,
        waist_size: `${this.createBotFormGroup.value.personal_details?.waist_size} cm`,
        hip_size: `${this.createBotFormGroup.value.personal_details?.hip_size} cm`,
        shoe_size: `${this.createBotFormGroup.value.personal_details?.shoe_size} cm`,
        weight: `${this.createBotFormGroup.value.personal_details?.weight} Kg`,
        height: `${this.createBotFormGroup.value.personal_details?.height} cm`,
        birthday: this.pipe.transform(this.createBotFormGroup.value.personal_details?.birthday, 'MM/dd/yyyy'),
        favorite_color: this.createBotFormGroup.value.personal_details?.favorite_color,
        voice: this.createBotFormGroup.value.personal_details.voice
      },
      verify_status: 'not_verified'
    }
    this.httpService.createBot(payload).subscribe(response => {
      this.routers.navigate(['dashboard/bot']);
      this.showLoader = false;
    }, error => {
      this.showLoader = false;
    });
  }

  stepperUpdateSubmit() {
    this.showLoader = true;
    let payload = {
      bot_name: this.createBotFormGroup.value.bot_name,
      bot_username: this.createBotFormGroup.value.bot_username,
      description: this.createBotFormGroup.value.description,
      about: this.createBotFormGroup.value.about,
      image_url: this.base64Image,
      training_model: this.createBotFormGroup.value.training_model,
      bot_type: this.createBotFormGroup.value.bot_type,
      bot_admin_command: this.createBotFormGroup.value.bot_admin_command,
      bot_admin_command_description: this.createBotFormGroup.value.bot_admin_command_description,
      personal_details: {
        personality_type: this.createBotFormGroup.value.personal_details?.personality_type,
        clothing_size: this.createBotFormGroup.value.personal_details?.clothing_size,
        shoulder_size: `${this.createBotFormGroup.value.personal_details?.shoulder_size} cm`,
        bust_size: `${this.createBotFormGroup.value.personal_details?.bust_size} cm`,
        waist_size: `${this.createBotFormGroup.value.personal_details?.waist_size} cm`,
        hip_size: `${this.createBotFormGroup.value.personal_details?.hip_size} cm`,
        shoe_size: `${this.createBotFormGroup.value.personal_details?.shoe_size} cm`,
        weight: `${this.createBotFormGroup.value.personal_details?.weight} Kg`,
        height: `${this.createBotFormGroup.value.personal_details?.height} cm`,
        birthday: this.pipe.transform(this.createBotFormGroup.value.personal_details?.birthday, 'MM/dd/yyyy'),
        favorite_color: this.createBotFormGroup.value.personal_details?.favorite_color,
        voice: this.createBotFormGroup.value.personal_details.voice
      },
      verify_status: this.createBotFormGroup.value.verify_status
    }
    this.httpService.updateBot(this.router.snapshot.queryParams['botUsername'], payload).subscribe(response => {
      this.showLoader = false;
      this.routers.navigate(['dashboard/bot']);
    }, error => {
      this.showLoader = false;
    });
  }

  palyAudio(track) {
    if (this.isPlay) {
      this.isPlay = false;
    } else {
      this.isPlay = true;
      let audio = new Audio();
      audio.src = track.url;
      audio.load();
      audio.play();
      this.isPlay = false;
    }
  }

  pondHandleInit() {
  }

  pondHandleAddFile(event: any) {
    this.base64Image = this.myPond.getFile().getFileEncodeBase64String();
    this.createBotFormGroup.controls.image_url.setValue(this.base64Image);
  }

  setFormData() {
    if (this.router.snapshot.queryParams['botUsername']) {
      this.isEdit = true;
      this.httpService.getBotByUsername(this.router.snapshot.queryParams['botUsername']).subscribe(response => {
        let data: any = response;
        data.personal_details.bust_size = data.personal_details.bust_size.replace(" cm", "");
        data.personal_details.waist_size = data.personal_details.waist_size.replace(" cm", "");
        data.personal_details.hip_size = data.personal_details.hip_size.replace(" cm", "");
        data.personal_details.shoe_size = data.personal_details.shoe_size.replace(" cm", "");
        data.personal_details.weight = data.personal_details.weight.replace(" Kg", "");
        data.personal_details.height = data.personal_details.height.replace(" cm", "");
        data.personal_details.shoulder_size = data.personal_details.shoulder_size.replace(" cm", "");
        data.personal_details.birthday = new Date(data.personal_details.birthday);
        this.createBotFormGroup.setValue(data);
        this.base64Image = data.image_url;
        this.pondFiles = [`data:image/png;base64,${this.base64Image}`];
        this.showLoader = false;
      });
    }
  }

}
