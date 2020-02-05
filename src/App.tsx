import React from 'react';
import './App.css';
// import ian from "./23196210.jpg";
const Hash = require('ipfs-only-hash');

type Props = {

}

export default class App extends React.Component<Props, {}>{

    async testHashes() {
        const url = "https://raw.githubusercontent.com/IanPhilips/jst-cids-test/master/src/23196210.jpg";
        fetch(url)
            .then(response => response.blob())
            .then(blob => new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.readAsDataURL(blob)

            })).then(async dataUrl =>{

                const strData = dataUrl as string;
                // remove "data:*/*;base64," from dataUrl
                const endOfPrefix = strData.indexOf(",");
                const cleanStrData = strData.slice(endOfPrefix+1);
                const data = Buffer.from(cleanStrData, "base64");
                const hash = await Hash.of(data);
                console.log("fetch data CID: " + hash); // QmYHzA8euDgUpNy3fh7JRwpPwt6jCgF35YTutYkyGGyr8f
            });

        console.log("ipfs-desktop CID: QmYHzA8euDgUpNy3fh7JRwpPwt6jCgF35YTutYkyGGyr8f");
    }
    constructor(props:Props) {
        super(props);
        this.testHashes();
    }
    state ={
        image:HTMLImageElement
    }

    render(){
          return (
            <div className="App">
              <header className="App-header">
                  <div>
                  {this.state.image ?
                      this.state.image :
                      <div/>
                  }
                  </div>
              </header>

            </div>

          );
    }
}
