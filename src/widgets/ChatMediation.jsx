import admin from '../assets/img/admin.png';
import doc from '../assets/icons/doc.svg';
import send from '../assets/icons/send.svg';
import ChatComponent from './ChatComponent';
import LitigeMessages from './LitigeMessages';







export function ChatMediation() {









    return(


            <div className="chat-container">

                {/* <ChatComponent/> */}



                {/* <div className="notification-message-conainer">

                   <div className="notification-chat-container">

                    <h3>Messages</h3>
                    <span className="notification-chat">12</span>



                   </div>

                   <div className='message-items-container'>

                    <input className='search-message' placeholder='Search messages'/>

                    <div className='admin-profil message-chat-container-send'>

                        <img src={admin} className='admin-icon send-message-icon'/>

                        <div>

                            <span>Tchouks</span>
                            <span className='admin-text'>Bonjour j'ai un soucis</span>
                            <span className='admin-text profil-text'>Locataire</span>

                        </div>

                        <span className='message-date'>12m</span>


                    </div>

                    <div className='admin-profil message-chat-container-send'>

                        <img src={admin} className='admin-icon send-message-icon'/>

                        <div>

                            <span>Tchouks</span>
                            <span className='admin-text'>Bonjour j'ai un soucis</span>
                            <span className='admin-text profil-text profil-text-proprietaire'>Proprietaire</span>

                        </div>

                        <span className='message-date'>12m</span>


                    </div>










                   </div>



                </div>

                <div className="message-container">

                    <div className='message-name'>

                        <div className='admin-profil message-chat-container'>

                            <img src={admin} className='admin-icon message-icon-chat'/>

                            <div>

                                <span>Tchouks</span>
                                <span className='admin-text'>En ligne</span>

                            </div>


                        </div>

                    </div>

                    <div className='write-message-container'>


                        <img src={doc} className=''/>

                        <div className='write-message'>

                            <input className='input-message-send'/>
                            <img src={send} className=''/>

                        </div>






                    </div>





                </div> */}



                    <LitigeMessages/>






            </div>






    )





}