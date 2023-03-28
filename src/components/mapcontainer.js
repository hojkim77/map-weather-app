import React, { useEffect, useState } from 'react'
import styles from "./mapcontainer.module.css";
import axios from 'axios';

const { kakao } = window

const MapContainer = ({searchPlace, setcenterPosition, setendPosition ,propModal }) => {

  // 검색결과 배열에 담아줌
  const [Places, setPlaces] = useState([]);
  const [centerps, setCenterps] = useState("");
  const [endps, setEndps] = useState("");
  
  useEffect(() => {
    
    var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 })
    var markers = []
    const container = document.getElementById('myMap')
    var map = new kakao.maps.Map(container, {
      center: new kakao.maps.LatLng(32, 127), // 중심 좌표
      level: 15
    })
    
    //' 지도 생성 '
    var drawingFlag = false; // 원이 그려지고 있는 상태를 가지고 있을 변수입니다
    var centerPosition; // 원의 중심좌표 입니다
    var drawingCircle; // 그려지고 있는 원을 표시할 원 객체입니다
    var drawingLine; // 그려지고 있는 원의 반지름을 표시할 선 객체입니다
    var drawingDot; // 그려지고 있는 원의 중심점을 표시할 커스텀오버레이 입니다
    var circles = []; // 클릭으로 그려진 원과 반경 정보를 표시하는 선과 커스텀오버레이를 가지고 있을 배열입니다
    // ' 원을 그리기 시작함 '
    kakao.maps.event.addListener(map, 'click', function(mouseEvent) { 
      if (!drawingFlag) {   
        drawingFlag = true; 
        centerPosition = mouseEvent.latLng; 

      } 
      // 그려지고 있는 원의 반경을 표시할 선 객체를 생성합니다
      if (!drawingLine) {
        drawingLine = new kakao.maps.Polyline({
            strokeWeight: 3, // 선의 두께입니다
            strokeColor: '#00a0e9', // 선의 색깔입니다
            strokeOpacity: 1, // 선의 불투명도입니다 0에서 1 사이값이며 0에 가까울수록 투명합니다
            strokeStyle: 'solid' // 선의 스타일입니다
        });    
      }
      if (!drawingCircle) {                    
        drawingCircle = new kakao.maps.Circle({ 
            strokeWeight: 1, // 선의 두께입니다
            strokeColor: '#00a0e9', // 선의 색깔입니다
            strokeOpacity: 0.1, // 선의 불투명도입니다 0에서 1 사이값이며 0에 가까울수록 투명합니다
            strokeStyle: 'solid', // 선의 스타일입니다
            fillColor: '#00a0e9', // 채우기 색깔입니다
            fillOpacity: 0.2 // 채우기 불투명도입니다 
        });
      }
      const cp = centerPosition
      setCenterps(centerPosition)
      setcenterPosition(centerPosition);
    });
    // ' 원을 그리는 중 '
    kakao.maps.event.addListener(map, 'mousemove', function (mouseEvent) {

      // 마우스무브 이벤트가 발생했을 때 원을 그리고있는 상태이면
      if (drawingFlag) {
  
          // 마우스 커서의 현재 위치를 얻어옵니다 
          var mousePosition = mouseEvent.latLng; 
          
          // 그려지고 있는 선을 표시할 좌표 배열입니다. 클릭한 중심좌표와 마우스커서의 위치로 설정합니다
          var linePath = [centerPosition, mousePosition];     
          
          // 그려지고 있는 선을 표시할 선 객체에 좌표 배열을 설정합니다
          drawingLine.setPath(linePath);
          
          // 원의 반지름을 선 객체를 이용해서 얻어옵니다 
          var length = drawingLine.getLength();
          
          if(length > 0) {
              
              // 그려지고 있는 원의 중심좌표와 반지름입니다
              var circleOptions = { 
                  center : centerPosition, 
              radius: length,                 
              };
              
              // 그려지고 있는 원의 옵션을 설정합니다
              drawingCircle.setOptions(circleOptions); 
                  
              // 반경 정보를 표시할 커스텀오버레이의 내용입니다
              var radius = Math.round(drawingCircle.getRadius()),   
              content = '<div class="info">반경 <span class="number">' + radius + '</span>m</div>';
              
              // 그려지고 있는 원을 지도에 표시합니다
              drawingCircle.setMap(map); 
              
              // 그려지고 있는 선을 지도에 표시합니다
              drawingLine.setMap(map);  

          } else { 
              
              drawingCircle.setMap(null);
              drawingLine.setMap(null);    
              
          }
          
      }     
    }); 
    // ' 원 그리기 종료 '    
    kakao.maps.event.addListener(map, 'rightclick', function (mouseEvent) {

      if (drawingFlag) {
  
          // 마우스로 오른쪽 클릭한 위치입니다 
          var rClickPosition = mouseEvent.latLng; 
  
          // 원의 반경을 표시할 선 객체를 생성합니다
          var polyline = new kakao.maps.Polyline({
              path: [centerPosition, rClickPosition], // 선을 구성하는 좌표 배열입니다. 원의 중심좌표와 클릭한 위치로 설정합니다
              strokeWeight: 3, // 선의 두께 입니다
              strokeColor: '#00a0e9', // 선의 색깔입니다
              strokeOpacity: 1, // 선의 불투명도입니다 0에서 1 사이값이며 0에 가까울수록 투명합니다
              strokeStyle: 'solid' // 선의 스타일입니다
          });
          
          // 원 객체를 생성합니다
          var circle = new kakao.maps.Circle({ 
              center : centerPosition, // 원의 중심좌표입니다
              radius: polyline.getLength(), // 원의 반지름입니다 m 단위 이며 선 객체를 이용해서 얻어옵니다
              strokeWeight: 1, // 선의 두께입니다
              strokeColor: '#00a0e9', // 선의 색깔입니다
              strokeOpacity: 0.1, // 선의 불투명도입니다 0에서 1 사이값이며 0에 가까울수록 투명합니다
              strokeStyle: 'solid', // 선의 스타일입니다
              fillColor: '#00a0e9', // 채우기 색깔입니다
              fillOpacity: 0.2  // 채우기 불투명도입니다 
          });
          setEndps(rClickPosition)

          var radius = Math.round(circle.getRadius());// 원의 반경 정보를 얻어옵니다
  
  
          // 원을 지도에 표시합니다
          circle.setMap(map); 
          
          // 선을 지도에 표시합니다
          polyline.setMap(map);
          
          // 배열에 담을 객체입니다. 원, 선, 커스텀오버레이 객체를 가지고 있습니다
          var radiusObj = {
              'polyline' : polyline,
              'circle' : circle,
          };
          
          // 배열에 추가합니다
          // 이 배열을 이용해서 "모두 지우기" 버튼을 클릭했을 때 지도에 그려진 원, 선, 커스텀오버레이들을 지웁니다
          circles.push(radiusObj);   
      
          // 그리기 상태를 그리고 있지 않는 상태로 바꿉니다
          drawingFlag = false;
          
          // 중심 좌표를 초기화 합니다  
          centerPosition = null;
          
          // 그려지고 있는 원, 선, 커스텀오버레이를 지도에서 제거합니다
          circle.setMap(null); 
          polyline.setMap(null);
          propModal(); //modal = true
          setendPosition(rClickPosition); // modal에 전달할 end값
      }
      
    });   
    
  
    const ps = new kakao.maps.services.Places() // 장소 검색 서비스
    
    ps.keywordSearch(searchPlace, placesSearchCB) // 입력한 키워드로 서치 // 이 키워드는 인자로 받아오는 searchPlace이다.
    
    //'위 keywordSearch의 콜백함수'
    function placesSearchCB(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) { // 검색 결과가 있으면( = status = ok)
        let bounds = new kakao.maps.LatLngBounds() // 영역 객체 생성하고 > 35 line

        for (let i = 0; i < data.length; i++) {
          displayMarker(data[i])
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x)) // 객체 extend하고 > 38line
        }

        map.setBounds(bounds) // 영역(bound) 적용

        // 페이지 목록 보여주는 displayPagination() 추가
        displayPagination(pagination)
        setPlaces(data)
      }
    }

    
    //' 검색결과 목록 하단에 페이지 번호 표시 '
    function displayPagination(pagination) {
      var paginationEl = document.getElementById('pagination'),
        fragment = document.createDocumentFragment(),
        i

      // 기존에 추가된 페이지 번호 삭제
      while (paginationEl.hasChildNodes()) {
        paginationEl.removeChild(paginationEl.lastChild)
      }

      for (i = 1; i <= pagination.last; i++) {
        var el = document.createElement('a')
        el.href = '#'
        el.innerHTML = i

        if (i === pagination.current) {
          el.className = 'on'
        } else {
          el.onclick = (function (i) {
            return function () {
              pagination.gotoPage(i)
            }
          })(i)
        }

        fragment.appendChild(el)
      }
      paginationEl.appendChild(fragment)
    }
    var imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png', // 마커이미지의 주소입니다    
    imageSize = new kakao.maps.Size(30, 35), // 마커이미지의 크기입니다
    imageOption = {offset: new kakao.maps.Point(27, 69)}; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
      
    //' 마커의 이미지정보를 가지고 있는 마커이미지를 생성'
    var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption)
    function displayMarker(place) {
      let marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x),
        image : markerImage
      })
      marker.setMap(map); // 지도에 올린다. 왜 이게 없어도 마커가 표시되는지?

      kakao.maps.event.addListener(marker, 'click', function () {
        infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>')
        infowindow.open(map, marker)
      })
    }
  }, [searchPlace])


  return (
    <div className={styles.mapcontainer}>
      <div>
        <div
          id="myMap"
          style={{
            width: '100%',
            height: '581px',
          }}
        >
        </div>
      </div>
      <div id="result-list" className={styles.result}>
        {Places.map((item, i) => (
          <div key={i} style={{ marginTop: '20px' }}>
            <span>{i + 1}</span>
            <div>
              <h5>{item.place_name}</h5>
              {item.road_address_name ? (
                <div>
                  <span>{item.road_address_name}</span>
                  <span>{item.address_name}</span>
                </div>
              ) : (
                <span>{item.address_name}</span>
              )}
              <span>{item.phone}</span>
            </div>
          </div>
        ))}
        <div id="pagination" className={styles.pagination}></div>
      </div>
    </div>
  )
}

export default MapContainer