/*global Vue*/
/*global fetch*/
/*global axios*/

var app = new Vue({
  el: '#app',
    data: {
    quotes:[],
    notes: '',
    cat: 0,
    val:1,
    full:'',
    current:'',
  },
  created(){
    for (var i = 0; i < 10; i++) { 
      this.quotes[i] = []; 
    } 
 
  fetch('quotes.txt')
  .then(response => response.text())
  .then(text =>{
    this.full = text;
    for(var i =0; i < 10;i++){
      this.quotes[i][0] = (this.full.substring(0, this.full.search('\n')));
      this.full = this.full.substring(this.full.search('\n')+1);
      for(var j =1;j<11;j++){
        this.quotes[i][j] = (this.full.substring(0, this.full.search('\n')));
        //console.log("i: " + i + "j: " +j + this.quotes[i][j]);
        this.full = this.full.substring(this.full.search('\n')+1);
      }
      this.full = this.full.substring(this.full.search('\n')+1);
      
    }
    this.current = this.quotes[0][1];
  });
  },
  methods:{
      async saveNotes(){
        try {
        let response = await axios.post("/api/notes",{
          cat: this.cat,
          row: this.row,
        });
        this.notes = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
      },
      async loadNotes(){
        try {
        let response = await axios.get("/api/notes",{
          cat: this.cat,
          row: this.row,
        });
        this.notes = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
      },
      zero(){
        this.cat = 0;
        this.current = this.quotes[0][1];
      },
      one(){
        this.cat = 1;
        this.current = this.quotes[1][1];
      },
      two(){
        this.cat = 2;
        this.current = this.quotes[2][1];
      },
      three(){
        this.cat = 3;
        this.current = this.quotes[3][1];
      },
      four(){
        this.cat = 4;
        this.current = this.quotes[4][1];
      },
      five(){
        this.cat = 5;
        this.current = this.quotes[5][1];
      },
      six(){
        this.cat = 6;
        this.current = this.quotes[6][1];
      },
      seven(){
        this.cat = 7;
        this.current = this.quotes[7][1];
      },
      eight(){
        this.cat = 8;
        this.current = this.quotes[8][1];
      },
      nine(){
        this.cat = 9;
        this.current = this.quotes[9][1];
      },
      left(){
        if(this.val >1){
          this.val--;
          this.current = this.quotes[this.cat][this.val];
        }
        
      },
      right(){
        if(this.val <10){
        this.val++;
        this.current = this.quotes[this.cat][this.val];
        }
      },
      random(){
        this.saveNotes();
        this.cat = Math.floor(Math.random() * 10); 
        this.val = Math.floor(Math.random() * 10)+1;   
        //console.log(this.cat + " " +this.val);
        this.current = this.quotes[this.cat][this.val];
      }
  },
});