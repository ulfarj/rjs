import React from 'react';
import Relay from 'react-relay';
import {Table, Input, Fade, Button, Well, ButtonToolbar, Overlay, Popover, Panel, Modal, 
	Grid, Row, Col, Tabs, Tab} from 'react-bootstrap';
import _ from 'lodash';


class EditCompany extends React.Component {
	render() {
		return(
			<Tabs defaultActiveKey={1}>
	          <Tab eventKey={1} title="Tab 1">
	            <div style={{paddingTop: '10px'}}>
	              <div style={{display: 'flex', flexDirection: 'row',}}>
	                <Input type="text" label="Nafn" placeholder="Nafn" ref="name" style={{width: 250}} />
	                <Input type="text" label="Nafn samkvæmt rsk" placeholder="Rekstrarnafn" ref="namersk" style={{width: 250}} />
	              </div>
	                   
	              <div style={{display: 'flex', flexDirection: 'row'}}>  
	                <Input type="text" label="Kennitala" placeholder="Kennitala" ref="ssn" style={{width: 250}} />
	                <Input type="text" label="Heimilisfang" placeholder="Heimilisfang" ref="address" style={{width: 250}} />
	                <Input type="text" label="Póstnúmer" placeholder="Póstnúmer" ref="postalCode" style={{width: 120}} />
	              </div>

	              <div style={{display: 'flex', flexDirection: 'row'}}>                   
	                <Input type="text" label="Sími" placeholder="Sími" ref="phone" style={{width: 250}} />
	                <Input type="text" label="Netfang" placeholder="Netfang" ref="email" style={{width: 250}} />
	                <Input type="text" label="Tengill" placeholder="Tengill" ref="link" style={{width: 250}} />
	              </div>
	            </div>
	          </Tab>
	          <Tab eventKey={2} title="Tab 2">
	            <div style={{paddingTop: '10px'}}>              
	               <div style={{display: 'flex', flexDirection: 'row',}}>
	                    <Input type="select" ref="salesman" label="Sölumaður" onChange={this.changeSalesman} style={{width: 280}}>
	                      
	                    </Input>
	                    <Input type="text" label="Söludagur" placeholder="Söludagur" ref="dateofsale" style={{width: 140}} />                                     

	                    <Input type="select" ref="otimabundinn" label="Ótímabundinn" style={{width: 260}}>
	                       <option value="timabundinn">Tímabundinn samningur</option>
	                       <option value="otimabundinn">Ótímabundinn samningur</option>
	                    </Input>  

	                    <Input type="text" label="Samningur" placeholder="Samningur" ref="samningur" style={{width: 120}} />                                     

	                </div>
	                <div style={{display: 'flex', flexDirection: 'row',}}>
	                  <Input type="text" label="Heildar-upphæð samnings m.v. 12 mán" placeholder="Heildar-upphæð samnings m.v. 12 mán" ref="totalamount" style={{width: 280}} />           
	                  <Input type="text" label="Upphæð áskriftar" placeholder="Upphæð áskriftar" ref="descriptionamount" style={{width: 140}} />   

	                  <Input type="text" label="Fyrsti gjalddagi" placeholder="Fyrsti gjalddagi" ref="dateofsale" style={{width: 140}} />
	                  <Input type="text" label="Fyrsta birting" placeholder="Fyrsta birting" ref="dateofsale" style={{width: 140}} />
	                  <Input type="text" label="Uppsögn" placeholder="Uppsögn" ref="dateofsale" style={{width: 140}} />                   

	                </div>

	                <div style={{display: 'flex', flexDirection: 'row',}}>
	                  <Input type="text" label="Síðasti gjalddagi" placeholder="Síðasti gjalddagi" ref="dateofsale" style={{width: 140}} />  
	                  <Input type="text" label="Síðasta birting" placeholder="Síðasta birting" ref="dateofsale" style={{width: 140}} />

	                  <Input type="text" label="Grein" placeholder="Grein" ref="dateofsale" style={{width: 140}} />  
	                  <Input type="text" label="Auglýsing" placeholder="Auglýsing" ref="dateofsale" style={{width: 140}} />

	                  <Input type="text" label="Umfjöllun/mynd" placeholder="Umfjöllun/mynd" ref="dateofsale" style={{width: 140}} />
	                </div>

	                <div style={{display: 'flex', flexDirection: 'row',}}>
	                <Input type="text" label="E-mail" placeholder="E-mail" ref="dateofsale" style={{width: 140}} />  
	                <Input type="text" label="Efni komið" placeholder="Efni komið" ref="dateofsale" style={{width: 140}} />  
	                <Input type="text" label="Próförk" placeholder="Próförk" ref="dateofsale" style={{width: 140}} />  
	                <Input type="text" label="Leiðrétt" placeholder="Leiðrétt" ref="dateofsale" style={{width: 140}} />  
	                <Input type="text" label="Samþykkt" placeholder="Samþykkt" ref="dateofsale" style={{width: 140}} />  

	                </div>


	                <div style={{display: 'flex', flexDirection: 'row',}}>
	                <Input type="text" label="Birting í appi" placeholder="Birting í appi" ref="dateofsale" style={{width: 140}} />  
	                <Input type="text" label="Aðgangur að appi sendur" placeholder="Aðgangur að appi sendur" ref="dateofsale" style={{width: 200}} />  
	                <Input type="text" label="Staðsetning" placeholder="Staðsetning" ref="dateofsale" style={{width: 140}} />  
	                <Input type="text" label="Flokkur" placeholder="Flokkur" ref="dateofsale" style={{width: 140}} />  
	            

	                </div>
	            </div>        
	          </Tab>
	          <Tab eventKey={3} title="Tab 3">
	            <div style={{paddingTop: '10px'}}>              
	               <div>
	                <Input type="checkbox" label="Lögfræðimerkt" ref="dateofsale" style={{}} />  
	               </div>
	               <div>
	                 <Input type="checkbox" label="Tala við innheimtu áður en selt er" ref="dateofsale" style={{}} />  
	               </div>
	            </div>


	          </Tab>

  			</Tabs>
		);
	}
}

export default EditCompany;