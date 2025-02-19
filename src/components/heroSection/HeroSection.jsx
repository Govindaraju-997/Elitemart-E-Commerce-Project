// const HeroSection = () => {
//     return (
//         <div>
//             <img className=" h-40 lg:h-full" src="https://devknus.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2Feeee8099-a731-4be4-b949-97588572fb6b%2Faf556a00-6601-4a15-8931-dab16ebd5981%2FUntitled.png?table=block&id=4ec2cb9b-b4a9-4de8-8195-725a3a795de5&spaceId=eeee8099-a731-4be4-b949-97588572fb6b&width=2000&userId=&cache=v2_" alt="Image" />
//         </div>
//     );
// }

// export default HeroSection;





import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const HeroSection = () => {
    const slides = [
        "https://mir-s3-cdn-cf.behance.net/project_modules/fs/aaaa2e90302069.5e1418901d0c0.jpg",
        "https://mir-s3-cdn-cf.behance.net/project_modules/fs/af526290302069.5e1418901d80c.jpg",
        "https://mir-s3-cdn-cf.behance.net/project_modules/fs/7a9a4690302069.5e1418901c855.jpg",
        "https://mir-s3-cdn-cf.behance.net/project_modules/source/f55f0690302069.5e1418901e04e.jpg"
    ];

    return (
        <div className="w-full">
            <Swiper
                loop={true}  
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="w-full"
            >
                {slides.map((image, index) => (
                    <SwiperSlide key={index}>
                        <div className="w-full h-40 lg:h-full">
                            <img 
                                src={image} 
                                alt={`Slide ${index + 1}`} 
                                className="w-full h-full object-cover"
                                loading="lazy"
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default HeroSection;
