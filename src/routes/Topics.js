import React, {Component} from 'react'
import {Table, Button, Form, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import './Topics.css'
import config from '../config'
import ipfs from '../eth-ipfs/ipfs'

class Topics extends Component{
    constructor(props){
        super(props);
        this.state = {
            fileName:'',
            fileHash:''
        }
    }
    getDataRow(h){
        var row = document.createElement('tr'); //创建行
        var link= "http://ipfs.io/ipfs/"+h.hash;
        
        var fileName = document.createElement('td');//创建第一列fileName
        var Hyperlink = document.createElement('a');//创建a标签
        fileName.innerHTML = h.name;
        Hyperlink.appendChild(fileName);
        Hyperlink.setAttribute('href',link); 
        Hyperlink.setAttribute('class', 'topicsLink')
        Hyperlink.setAttribute('target', '_blank')
        console.log(fileName);
        row.appendChild(Hyperlink);
        
        var fileHash = document.createElement('td');//创建第二列fileHash
        fileHash.innerHTML = h.hash;
        row.appendChild(fileHash);
        var fileOwner = document.createElement('td');//创建第三列fileOwner
        fileOwner.innerHTML = h.userName;
        row.appendChild(fileOwner);
        var downloadCell = document.createElement('td');//创建第四列，操作列
	    row.appendChild(downloadCell);
	    var btnDownload = document.createElement('input'); //创建一个input控件
	    btnDownload.setAttribute('type','button'); //type="button"
        btnDownload.setAttribute('value','下载'); 
	 
	    //下载操作
        btnDownload.onclick=async()=>{
            let fileName = h.name;
            let down = this.downFile;
            await ipfs.get(h.hash, function (err, files) {
                if (err) console.log("ipfsGetErr", err);
                files.forEach((file) => {
                    //console.log(typeof(file.content))
                    //console.log(file.content)
                    let blob = new Blob([file.content], { type: '' });
                    //console.log(blob);
                    down(blob, fileName)

                })

            })
        };
        downloadCell.appendChild(btnDownload);  //把下载按钮加入td
            return row;
    }

    searchFile = () => {
        console.log("search file : ",document.getElementById('filePara').value);
        fetch(config.express.url + config.express.port + "/search?filePara=" + document.getElementById('filePara').value)
            .then(res => res.text())
            .then(res => {
            console.log("file :", JSON.parse(res));
            var file = JSON.parse(res)
            var tbody = document.getElementById('tbMain');
            if (file.length>0){
                for(var i = 0;i < file.length; i++){ //遍历一下json数据
                    var trow = this.getDataRow(file[i]); //定义一个方法,返回tr数据
                    tbody.appendChild(trow);
                }
            }
            else{
                alert("未找到相关论文，请重新输入！")
            }
        })
}
    downFile(blob, fileName) {
        // if (!window.navigator.msSaveOrOpenBlob) {
        //     navigator.msSaveBlob(blob, fileName);
        // } else {
            var link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = fileName;
            link.click();
            window.URL.revokeObjectURL(link.href);
    // }
    }
/*
    download = async() => {
        let fileName = this.state.fileName;
        let down = this.downFile;
        await ipfs.get(this.state.fileHash, function (err, files) {
            if (err) console.log("ipfsGetErr", err);
            files.forEach((file) => {
                //console.log(typeof(file.content))
                //console.log(file.content)
                let blob = new Blob([file.content], { type: '' });
                //console.log(blob);
                down(blob, fileName)

            })

        })

        
    } 
    /*
    downloadFile = async () => { 
        //let cid = document.getElementById("ipfsHash").innerText
        fetch(config.express.url + config.express.port + "/topic?cid=" + this.state.fileHash + "&filename=" + this.state.fileName)
          .then(res => res.text())
          .then(res => {
            console.log("downloading statues :", res)
          })
    }
    */
    

    render() {
        return (
            
            <div className = 'Topics'>
                <header className = 'Topics-Header'>
               
                    <h2>Topics</h2>
                </header>
                <hr/>
                <div className='TopicBody'>
                <Form >
                    <FormGroup>
                        <ControlLabel>fileName or fileHash</ControlLabel>{' '}
                        <FormControl id="filePara" 
                        placeholder="example:'keyworld'or 'fullname' or 'QmcFc6EPhavNSfdjG8byaxxV6KtHZvnDwYXLHvyJQPp3uN'" />
                    </FormGroup>{' '}
                    <Button 
                        id="button_press"             
                        onClick = {this.searchFile}>
                        Search
                    </Button>
                </Form>
                <Table striped bordered  condensed hover>
                    <thead>
                        <tr>
                        <th>File Name</th>
                        <th>File Hash</th>
                        <th>File Owner</th>
                        <th>Operation</th>
                        </tr>
                    </thead>
                    <tbody id="tbMain">
                        <tr>
                        </tr>
                    </tbody>
                </Table>
                {/*<Button onClick = {this.downloadFile}>Download</Button>*/}
            </div>
            </div>
        )
    }
}

export default Topics;