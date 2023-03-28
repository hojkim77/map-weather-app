import React, { useEffect, useState } from 'react'
import MapContainer from '../mapcontainer'
import styles from "./landingpage.module.css";
import Modal from '../modal/modal';
import Weather from '../weather'
import Modalef from '../modal/modaleffect';
import Header from './header';
import axios from 'axios';

const API_KEY = "cf6a79df83755f70ef36492970c575cc";

function LandingPage() {
  const [InputText, setInputText] = useState('');
  const [Place, setPlace] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [centerps, setCenterps] = useState("");
  const [endps, setEndps] = useState("");
  const [main, setMain] = useState("");

  const onChange = (e) => {
    setInputText(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setPlace(InputText)
    setInputText('')
  }

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  const setcenterPosition = (prop) => {
    console.log(prop)
    setCenterps(prop);
  };
  const setendPosition = (prop) => {
    setEndps(prop);
  };
  const setmainWeather = (prop)=> {
    setMain(prop);
  }
  
      
  return (
    <>
      <div className={styles.landingPage}>
        <Header/>
        <div className={styles.main}>
          <div className={styles.mapcontainer}>
            <form onSubmit={handleSubmit} className={styles.input}>
              <input placeholder="검색어를 입력하세요" onChange={onChange} value={InputText} />
              <button type="submit">검색</button>
            </form>
            <MapContainer searchPlace={Place} setcenterPosition={setcenterPosition}
            setendPosition={setendPosition} propModal={openModal} className={styles.map}/>
            <Modal open={modalOpen} close={closeModal} header="Modal heading" centerps={centerps} endps={endps}>
              <Weather center={centerps} end={endps} setmainWeather={setmainWeather}/>
              <Modalef main={main}/>
            </Modal >
          </div>
        </div>  
      </div>
    </>
  )
}

export default LandingPage