
import axios from "axios";

// ex A

const gettitle =  async (url) => {
    try{
        const response = await fetch(url)
        if (!response.ok){
            throw new Error(`Response status:${response.status}`);
        }
        // console.log(response);
        const json = await response.json();
        return console.log(json.title);
    }catch(error){
        console.log(error.message);

    }
       
}

const get_title = async (url) =>{

    return await fetch(url)
    .then((response) => response.json())
    .then((json) => console.log(json.title))
}



const url = "https://jsonplaceholder.typicode.com/posts/3";

// gettitle(url)

// get_title(url)


// EX B




const show_title  = async () => {
    const url = "https://jsonplaceholder.typicode.com/comments/10";
    try{
        const response = await axios.get(url);
        // console.log(response);
        console.log(response.data.email);
        console.log(response.data.body);
    } catch (error) {
        console.error(error);
    }
}

// show_title()


// EX C

const show_name = async () => {
    const url = "https://jsonplaceholder.typicode.com/users";
    const response = await axios.get(url);
    let contador = 1;
    try{

        response.data.forEach(dic => {
            console.log(`Usuario ${contador}: ${dic.name}`);
            contador +=1;
        });
    } catch(error){
        console.error(error);
    }
    // console.log(response);

}

show_name();