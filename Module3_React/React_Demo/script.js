let names = ["penny", "gaurav" ,"saurav" ,"pooja" ,"anil", "usha"];


function BigHello(){
    return <React.Fragment>
        {
            names.map(function(name){
                return <Hello key = {name} name={ name }></Hello>
            } )

        }
            
        
    </React.Fragment>
}

function Hello(props){
    return <h1>hello from {props.name} component!!</h1>
}

ReactDOM.render( <BigHello></BigHello> , document.querySelector("#root"));