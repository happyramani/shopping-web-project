import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import LATEST from "../assets/latest";
import { Link } from "react-router-dom";
import { RiShoppingCart2Line } from "react-icons/ri";
import { Autoplay } from "swiper/modules";

function ReletedProducts() {
  return (
    <div>
      <h4 className="border-l-4 pl-2 border-secondary bold-20">
        Releted Products
      </h4>
      <div className="mx-auto max-w-full">
        <Swiper
          modules={[Autoplay]}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          breakpoints={{
            600: {
              slidesPerView: 2,
              spaceBetween: 50,
            },
            1024: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            1200: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
          }}
          className="h-[188px] mt-5"
        >
          {LATEST.map((item, i) => (
            <SwiperSlide key={i}>
              <Link
                onClick={window.scrollTo(0, 0)}
                to={`/product/${item.id}`}
                className="flexCenter gap-x-5 bg-white p-4 rounded-x1"
              >
                <img
                  src={item.image}
                  alt="Local"
                  height={77}
                  width={77}
                  className="rounded-lg drop-shadow-x1"
                />
                <div className="flex flex-col gap-y-1">
                  <h4 className="line-clamp-1 medium-16">{item.name}</h4>
                  <p className="line-clamp-1">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad?
                  </p>
                  <div className="flexBetween">
                    <div className="flexBetween gap-x-2 medium-16">
                      <span>${item.new_price}.00</span>
                      <span className="line-through text-secondary">
                        ${item.old_price}.00
                      </span>
                    </div>
                    <RiShoppingCart2Line className="text-xl hover:text-secondary" />
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default ReletedProducts;
