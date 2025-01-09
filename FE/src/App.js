import logo from './logo.svg';
import './App.css';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
function App() {
  return (
    <div className="App">
      <Swiper
        // install Swiper modules
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={50}
        slidesPerView={3}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log('slide change')}
      >
        <SwiperSlide><img src="https://i.pinimg.com/736x/37/a6/44/37a64464d32f8dc2e26d172c2d981a56.jpg"></img></SwiperSlide>
        <SwiperSlide><img src="https://i.pinimg.com/736x/37/a6/44/37a64464d32f8dc2e26d172c2d981a56.jpg"></img></SwiperSlide>
        <SwiperSlide><img src="https://i.pinimg.com/736x/37/a6/44/37a64464d32f8dc2e26d172c2d981a56.jpg"></img></SwiperSlide>
        <SwiperSlide><img src="https://i.pinimg.com/736x/37/a6/44/37a64464d32f8dc2e26d172c2d981a56.jpg"></img></SwiperSlide>
        <SwiperSlide><img src="https://i.pinimg.com/736x/37/a6/44/37a64464d32f8dc2e26d172c2d981a56.jpg"></img></SwiperSlide>
        <SwiperSlide><img src="https://i.pinimg.com/736x/37/a6/44/37a64464d32f8dc2e26d172c2d981a56.jpg"></img></SwiperSlide>
      </Swiper>
    </div>
  );
}

export default App;
