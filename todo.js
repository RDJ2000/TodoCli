var fs = require('fs');
const yargs = require("yargs");
let params= yargs.argv;
let command = yargs.argv._[0];

let ListJson = require('./todo.json');
var List=ListJson;
let DoneJson = require('./done.json');
var Done=DoneJson;



if (command=='add') {
    console.log('in Add');
    if (params.item && params.item!=null && params.item!='') {
        List.push(params.item);
        console.log((params.item)+'is added in Todo List');
        console.log(List);
        storeDataToList();
    }
    else
    console.log('Please use  add --item [item]');
}
else if (command=='del') {
   
    if (params.index) {
        if (List.length>=params.index) {
            
        
        List.splice(params.index,1);
        storeDataToList();
        console.log('NO :'+params.index+'item is removed');
    }
    else{
    console.log('Invalid Index Number');
    console.log('Please Execute "todo ls" for available list index ');
}
}
}
else if (command=='ls') {
    console.log('=====================================');
    console.log('Pending : ');
    console.log('=====================================');
    for (let index = 0; index < List.length; index++) {
        console.log('['+index+']'+List[index]);
        
    }
}
else if (command=='done') {
  console.log(Done);
    if (params.index) {
          
            Done.push(List[params.index]);
            if (List.length>=params.index) {
            
        
                List.splice(params.index,1);
                storeDataToList();
                storeDataToDone();
                console.log('NO :'+params.index+'item is Executed');
            }
            console.log(Done);
            storeDataToList();
            storeDataToDone();
            
           
    }    
}

else if (command=='report') {
    console.log('=====================================');
    console.log('Pending : ');
    console.log('=====================================');
    for (let index = 0; index < List.length; index++) {
        console.log('['+index+']'+List[index]);
        
    }
    console.log('=====================================');
    console.log('Done: ');
    console.log('=====================================');
    for (let index = 0; index < Done.length; index++) {
        console.log('['+index+']'+Done[index]);
        
    }
  
}
else if(command=='help'){
    console.log('Usage  :- ');
    console.log('$todo add --item "todo item"  # Add a new todo');
    console.log('$todo ls                      # Show remaining todos');
    console.log('$todo del --index=NUMBER      # Delete a todo');
    console.log('$todo done --index=NUMBER     # Complete a todo');
    console.log('$todo --help                    # Show usage');
    console.log('$todo report                  # Statistics');
    
}









//Storing data of List
function storeDataToList(){
    require('fs').writeFile(

        './list.json',
    
        JSON.stringify(List),
    
        function (err) {
            if (err) {
                console.error('Error While Storing data in list.json');
            }
        }
    );
}
function storeDataToDone(){
    require('fs').writeFile(

        './done.json',
    
        JSON.stringify(Done),
    
        function (err) {
            if (err) {
                console.error('Error While Storing data in done.json');
            }
        }
    );
}