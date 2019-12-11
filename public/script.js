/*global Vue*/
/*global fetch*/
/*global axios*/

var app = new Vue({
  el: '#app',
    data: {
    quotes:[],
    notes: '',
    note:{
      _id: "5df03c9d81f52033f258ff9f"
    },
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
  this.loadNotes();
  },
  methods:{
      async saveNotes(){
        try {
        let response = await axios.post("/api/notes",{
          cat: this.cat,
          row: this.val,
          note: this.notes,
        });
        //console.log("save note");
        //console.log("saved:" + response);
        return true;
      } catch (error) {
        console.log(error);
      }
      },
      async loadNotes(){
        try {
          //console.log(this.cat+ " " + this.val);
        let response = await axios.put("/api/notes", {
          cat: this.cat,
          row: this.val,
        });
        //console.log(response.data);
        this.notes = response.data.notes;
        return true;
      } catch (error) {
        console.log(error);
      }
      },
      zero(){
        this.saveNotes();
        this.cat = 0;
        this.val = 1;
        this.current = this.quotes[0][1];
        this.loadNotes();
      },
      one(){
        this.saveNotes();
        this.cat = 1;
        this.val = 1;
        this.current = this.quotes[1][1];
        this.loadNotes();
      },
      two(){
        this.saveNotes();
        this.cat = 2;
        this.val = 1;
        this.current = this.quotes[2][1];
        this.loadNotes();
      },
      three(){
        this.saveNotes();
        this.cat = 3;
        this.val = 1;
        this.current = this.quotes[3][1];
        this.loadNotes();
      },
      four(){
        this.saveNotes();
        this.cat = 4;
        this.val = 1;
        this.current = this.quotes[4][1];
        this.loadNotes();
      },
      five(){
        this.saveNotes();
        this.cat = 5;
        this.val = 1;
        this.current = this.quotes[5][1];
        this.loadNotes();
      },
      six(){
        this.saveNotes();
        this.cat = 6;
        this.val = 1;
        this.current = this.quotes[6][1];
        this.loadNotes();
      },
      seven(){
        this.saveNotes();
        this.saveNotes();
        this.cat = 7;
        this.val = 1;
        this.current = this.quotes[7][1];
        this.loadNotes();
      },
      eight(){
        this.saveNotes();
        this.cat = 8;
        this.val = 1;
        this.current = this.quotes[8][1];
        this.loadNotes();
      },
      nine(){
        this.saveNotes();
        this.cat = 9;
        this.val = 1;
        this.current = this.quotes[9][1];
        this.loadNotes();
      },
      left(){
        console.log("left val: " + this.val);
        if(this.val >1){
          this.saveNotes();
          this.val--;
          this.current = this.quotes[this.cat][this.val];
          this.loadNotes();
        }
        
      },
      right(){
        console.log("right val: " + this.val);
        if(this.val <10){
        this.saveNotes();
        this.val++;
        this.current = this.quotes[this.cat][this.val];
        this.loadNotes();
        
        }
      },
      random(){
        this.saveNotes();
        this.cat = Math.floor(Math.random() * 10); 
        this.val = Math.floor(Math.random() * 10)+1;   
        console.log(this.cat + " " +this.val);
        this.current = this.quotes[this.cat][this.val];
        this.loadNotes();
      }
  },
});