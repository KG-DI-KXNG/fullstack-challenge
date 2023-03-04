<template>
  <div class="">
    <div class="main-content">
    <div class="container mt-7">
      <!-- Table -->
      <h2 class="mb-5">Random Users Weather</h2><div class="row">

        <div class="col">
          <div class="card shadow">
            <div class="card-header border-0">
              <h3 class="mb-0">Weather</h3>
            </div>
            <div class="table-responsive">
              <table class="table align-items-center table-flush">
                <thead class="thead-light">
                  <tr>
                    <th scope="col">User Name</th>
                    <th scope="col" colspan="2">Weather</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>

                  <tr v-for="(user, index) in data.users" :key="user.id" @click="launchModal(index)">
                    <th scope="row">
                      <div class="media align-items-center">
                        <a href="#" class="avatar rounded-circle mr-3">
                          <img alt="Image placeholder" :src="`https://ui-avatars.com/api/?background=random&name=${user.name}`">
                        </a>
                        <div class="media-body">
                          <span class="mb-0 text-sm">{{user.name}}</span>
                        </div>
                      </div>
                    </th>
                    <td>
                      {{ weather[index] ? weather[index].weather[0].description : 'Awaiting' }}
                    </td>
                    <td>
                      <span class="badge badge-dot mr-4">
                        <!-- <i class="bg-warning"></i>  -->
                        <img :src="weather[index] ? `../animated/${weather[index].weather[0].icon}.svg` : 'dasd'" alt="">
                      </span>
                    </td>
                    <td class="text-right">
                      <div class="dropdown">
                        <a class="btn btn-sm btn-icon-only text-light" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          <i class="fas fa-ellipsis-v"></i>
                        </a>
                        <div class="dropdown-menu dropdown-menu-right dropdown-menu-arrow">
                          <a class="dropdown-item" href="#">Action</a>
                          <a class="dropdown-item" href="#">Another action</a>
                          <a class="dropdown-item" href="#">Something else here</a>
                        </div>
                      </div>
                    </td>
                  </tr>

                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

        <!-- Modal -->
        <div class="modal fade custom-modal" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="closeModal( )">
                    <span aria-hidden="true">&times;</span>
                </button>
                <div class="modal_header2">
                    <div class="modal_top_head d-flex align-items-center">
                        <div class="modal_logo">
                            <img src="../assets/logo.png" />
                        </div>

                    </div>

                </div>
                <div class="modal-body">
                    <div class="agent_title_head text-center">
                        <h3>{{this.selected.user.name ?? 'd'}}</h3>
                        <h5>Welcome Back</h5>
                    </div>
                    <div class="agent_form_log">
                      <table class="table align-items-center table-flush">
                <thead class="thead-light">
                  <tr>
                    <th scope="col"></th>
                    <th scope="col" ></th>
                  </tr>
                </thead>
                <tbody v-if="selected.user && selected.weather">

                  <tr >
                    <th scope="row">
                      <div class="media align-items-center">
                        <div class="media-body">
                          <span class="mb-0 text-sm">Weather Type</span>
                        </div>
                      </div>
                    </th>
                    <td>
                      {{selected.weather.weather[0].main}}
                    </td>
                
                   
                  </tr>
                  <tr >
                    <th scope="row">
                      <div class="media align-items-center">
                        <div class="media-body">
                          <span class="mb-0 text-sm">Wind Speed</span>
                        </div>
                      </div>
                    </th>
                    <td>
                      {{selected.weather.wind.speed}}
                    </td>
                
                   
                  </tr>
                  <tr >
                    <th scope="row">
                      <div class="media align-items-center">
                        <div class="media-body">
                          <span class="mb-0 text-sm">Descrition</span>
                        </div>
                      </div>
                    </th>
                    <td>
                      {{selected.weather.weather[0].description}}
                    </td>
                
                   
                  </tr>

                </tbody>
              </table>
                    </div>

                </div>
            </div>
        </div>
    </div>
    </div>
</template>

<script>
import axios from 'axios';
import '../assets/table.css'
export default {
    name:'weather-component',
    props:['data'],
    data(){
        return{
            weather:[],
            selected:{
              user:'',
              weather:''
            }
        }
    },
    methods: {
       async fetchWeather(lat, lon){     
           let a = axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&type=hour&appid=4833bff12c7d06cb307613efec1d7c72`).then((response)=>{

               console.log(response);
               this.weather.push(response.data)
               return response.data
           })
           return a;
        },
        launchModal(i){
            // new bootstrap.Modal('#modal1', options)
          
          this.selected.user = this.data.users[i]
          this.selected.weather = this.weather[i]
            $('#myModal').modal('show')
        },
        closeModal(){
          $('#myModal').modal('hide')
        }
    },
    created() {
        this.data.users.forEach(async (element) => {
            let d = await this.fetchWeather(element.latitude, element.longitude)
        });
    },
}
</script>


<style lang="css" scoped>


.modal_header2 {
    background:url('../assets/background_weather.jpg'), no-repeat;
    background-position: center;
    background-size: cover;
    height: 160px;

}

.modal_logo img {
    width:70px;
}

.modal_logo {
    width: 50%;
}

.modal-content button {
    position: absolute;
    right: 0px;
    top: -2px;
    /* font-size: 30px; */
    /* color: #fff !important; */
    /* text-shadow: none; */
}

.modal-content button:focus {
    outline: none;
}

.modal-content {
    border-radius: 25px;
}

.modal_header2 {
    border-radius: 25px 25px 0px 0px;
}




.modal_top_head {
    padding: 15px 20px;
}

.modal-body h3 {
    font-size: 25px;
    color: #000;
    margin-bottom: 10px;
}

.modal-body h5 {
    font-size: 14px;
    letter-spacing: 1px;
    color: #000
}

.agent_form_log {
    padding: 0px 80px;
}

.agent_form_log input {
    height: 40px;
    border-radius: 0px;
    text-align: left;
    font-size: 14px;
    letter-spacing: 1px;
    margin-left: 35px;
    width: 90%;
    border-radius: 45px;
}

.agent_title_head {
    margin: 15px 0px;
}

.agent_form_log p {
    font-size: 14px;
}

.agent_form_log p a {
    color: #000;
}

.aget_log_btn {
    background: linear-gradient(to top right, #1325e8 -5%, #8f10b7 100%);
    color: #fff;
    padding: 5px 55px;
    border-radius: 25px;
}

.aget_log_btn:hover {
    background: linear-gradient(to top right, #8f10b7 -5%, #1325e8 100%);
    color: #fff;
    box-shadow: 10px 12px 4px #ccc
}

.agent_log_btn_sec {
    margin-bottom: 40px;
    margin-top: 20px;
}

.ageht_form_input_group {
    position: relative;
}

.ageht_form_input_group span i {
    color: #212569;
}

.ageht_form_input_group span {
    position: absolute;
    top: 9px;
    left: 0;
    font-size: 20px;
}

</style>