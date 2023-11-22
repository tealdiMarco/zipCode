import { Component,OnInit } from '@angular/core';

@Component({
  selector: 'componente1',
  templateUrl: './componente1.component.html',
  styleUrls: ['./componente1.component.css']
})
export class Componente1Component {
  dati:any;
  array:any[]=[];/*Inizializzo a vettore vuoto */
  id:string="";
  city:string="";
  pop:number=0;
  loc1:string="";
  loc2:string="";
  state:string="";

  ngOnInit(): void {
    fetch("http://localhost:1337/zips")
    .then((response)=>response.json())
    .then((data)=>{
      this.dati=data;
      console.log(this.dati);
    });
  }

  async sub() {
    let info ={
      city:this.city,
      loc:[this.loc1,this.loc2],
      pop:this.pop,
      state:this.state,
      _id:this.id
    }
    console.log(info);
  
  
    let busta = await fetch("http://localhost:1337/add", 
    {
      "method":"POST",
      "headers":{"Content-Type":"application/x-www-form-urlencoded"},
      "body": JSON.stringify(info)
    });

    let risposta = await busta.json()
    console.log(risposta.risposta);
  }
}

