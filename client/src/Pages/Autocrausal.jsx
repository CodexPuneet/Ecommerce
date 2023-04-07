import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";



import { Autoplay, Pagination, Navigation } from "swiper";
import { Box } from '@chakra-ui/react'
export default function Autocrausel() {
  return (
    <Box mt={"10px"}>
      <Swiper
     
     
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
          
        }}
      
        
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide >
            <img src="https://www.jiomart.com/images/cms/aw_rbslider/slides/1680457459_Best_of_Toys_and_Learning__desktop.jpg"></img>
        </SwiperSlide>
        <SwiperSlide>
        <img src="https://www.jiomart.com/images/cms/aw_rbslider/slides/1680298655_Molsis_desktop.jpg"></img>
        </SwiperSlide>
        <SwiperSlide>
        <img src="https://www.jiomart.com/images/cms/aw_rbslider/slides/1680153270_Web_Mumbai_PremiumFruits.jpg"></img> </SwiperSlide>
        <SwiperSlide>
        <img src="https://www.jiomart.com/images/cms/aw_rbslider/slides/1680704244_This_Ramadan_Save_Big_on_Dry_Fruits_desktop.jpg"></img>
        </SwiperSlide>
        <SwiperSlide>
            <img style={{width:"100%"}}src="https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=50,metadata=none,w=1440/layout-engine/2022-05/Group-33704.jpg" alt="" />
        </SwiperSlide>
      </Swiper>
    </Box>
  );
}