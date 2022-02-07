const input = document.querySelector("input");
const results = document.querySelector(".results");

class Node{
    constructor(){
        this.children = {}
        this.isEnd = false
    }
}

class Tries{
    constructor(){
        this.root = new Node();
        this.result = [];
    }

    add(vl, node = this.root){
        if (vl.length == 0){
            node.isEnd = true;
        }else if(!(vl[0] in node.children)){
            node.children[vl[0]] = new Node();
            this.add(vl.slice(1), node.children[vl[0]]);
        }else{
            this.add(vl.slice(1), node.children[vl[0]]);
        };
    }

    autocomplete(vl){
        let node = this.root;
        this.result = []
        let res = "";
        for (const x of vl){
            res += x;
            node = node.children[x];
        }
        this.traverse(node, res);

        return this.result
    }

    traverse(node, word){
        if (node.isEnd){
            this.result.push(word)
            return 0
        }else{
            for (const x in node.children){
                this.traverse(node.children[x], word + x)
            }
        }
    }
}

let dic = new Tries();

input.onkeyup = () =>{
    results.innerHTML = "";
    let res = dic.autocomplete(input.value);
    let limit = 6;
    for (let x of res){
        results.innerHTML += "<p>" + x + "</p>";
        limit -= 1;
        if (!limit) break
    }
}

async function load() {
    const req = await fetch("http://localhost:8080/dic");
    const res = await req.text();

    for (let x of res.split("\n")){
        dic.add(x)
    }
}

window.onload = load();