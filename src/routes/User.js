import React, {Component} from 'react'
import { Button } from 'react-bootstrap';

import ipfs from '../eth-ipfs/ipfs'
import config from '../config'

class User extends Component {

    constructor(props){
        super(props);
        this.state = {
            files: [],
            filestate: {}
  
        }
        this.showMore = this.showMore.bind(this)
    }
    
    /*
    getFileList = async() => {
        await ipfs.files.ls('/test1', (err, files) => {
            this.setState({files})
            files.map(file => console.log(file.name))
            
            // files.forEach((file) => {
            //   //console.log(file)

            //   this.setState((prevState) => ({
            //     counter: prevState.files.push(file)
            //   }));
            // })
        })
    }
    */

    getFileList = async () => {
        fetch(config.express.url + config.express.port + "/searchByUser?userName=" + sessionStorage.getItem('un'))
        .then(res => res.text())
            .then(res => {
            console.log("file :", JSON.parse(res));
            var files = JSON.parse(res)
            if (files.length<0){
                alert('您还未上传论文，请上传论文后重试！')
            }
            else{
                this.setState(files)
                
                files.forEach((file) => {
                this.setState((prevState) => ({
                        counter: prevState.files.push(file)
                    }))
                    })
                }
            /*
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
            */
        })
    }

    
  
    

    showMore(file) {
        ipfs.files.stat('/test1/'+file, (err, stats) => {
            console.log(stats)
            this.setState({filestate:stats})
        })
    }

    
    render() {
        return(
            <div id="userFileList" >
                <h2 >
                    User File
                    <Button  bsStyle="primary" onClick = {this.getFileList} style={{"marginLeft":"100px"}}> Display </Button>
                </h2>
                <hr/>
                
                <ul>
                    <div style={{width:"40%", float:"left"}}>
                        {this.state.files.map(file => 
                            <li key={file.name}>
                                <Button className="btnShow" onClick={this.showMore.bind(this, file.name) }></Button>
                                {file.name}
                                <hr/>
                            </li> )}
                    </div>
                </ul>

                <div style={{width:"55%", float:"right"}}>
                    <h2>fileType: {this.state.filestate.type} </h2>
                    <h2>fileSize: {this.state.filestate.size} </h2>
                    <h2>fileHash: {this.state.filestate.hash} </h2>

                </div>

            </div>



        )
    }
}

export default User;
