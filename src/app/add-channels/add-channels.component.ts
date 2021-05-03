import { Component, OnInit } from '@angular/core';
import {UserserviceService} from '../userservice.service'
import Swal from 'sweetalert2';
@Component({
  selector: 'app-add-channels',
  templateUrl: './add-channels.component.html',
  styleUrls: ['./add-channels.component.css']
})
export class AddChannelsComponent implements OnInit {

  constructor(private userService: UserserviceService) { }

  ngOnInit(): void {
  }

  AddChannel(name, description) 
  {
    var channelsInfo = {
      name: name,
      description: description,
     // spId: id,
    };
    if (name === '') {
      alert('please type Name');
    } else {
      this.userService.addGroup(channelsInfo).subscribe((data) => {
        Swal.fire('added!', 'success');
        this.ngOnInit();
      });
    }
    
  }

}
