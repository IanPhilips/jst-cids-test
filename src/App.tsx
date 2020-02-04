import React from 'react';
import './App.css';
import ian from "./23196210.jpg";
const Hash = require('ipfs-only-hash');

type Props = {

}

export default class App extends React.Component<Props, {}>{

    async testHashes() {
        const url = "https://avatars0.githubusercontent.com/u/23196210?s=460&v=4";
        const toDataURL = fetch(url)
            .then(response => response.blob())
            .then(blob => new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.readAsDataURL(blob)

            })).then(async dataUrl =>{

                const strData = dataUrl as string;
                const data = Buffer.from(strData);
                const hash = await Hash.of(data);
                console.log("fetch data hash: " + hash); // QmQAawPBfrhUsMMN7bCAVDHgm47NdpTsxGjMiVvtddoFo1
                // visualize the image to make sure we've got the right data
                let img = React.createElement(
                    "img",
                    {
                        src: strData,
                    },
                )
                this.setState({
                    image:img
                })

            });

        const data = Buffer.from(ian);
        const hash = await Hash.of(data);
        console.log("import image data hash: " + hash); // QmWFFQkkxxg4WgSJG6zvJR5wD4uM8jbPCWhfoEsppDPKjw

        // ipfs-desktop gives CID: QmYHzA8euDgUpNy3fh7JRwpPwt6jCgF35YTutYkyGGyr8f
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
