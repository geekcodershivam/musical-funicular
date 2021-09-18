import React, { useEffect, useState } from "react";
import API from "../api";
import "../Assets/Gallery.css";
import { motion } from "framer-motion";
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from "./Loading";
import Image from "./Image";
import Modal from "./Modal";

export default function Gallery({ search }) {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImg, setSelectedImg] = useState(null);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    fetchImages();
  }, [search]);

  const fetchImages = () => {
    setPage((page) => page + 1);

    (async () => {
      if (search==="") {
        const response = await API.get(
          `/?method=flickr.photos.getRecent&api_key=1583ada955f818856c5692be7cb57c4e&page=${page}&format=json&nojsoncallback=1`
        );
        const upo = response.data.photos.photo;
        setLoading(false);
        setImages([...images, ...upo]);
      } else {
        const response = await API.get(
          `/?method=flickr.photos.search&api_key=1583ada955f818856c5692be7cb57c4e&tags=${search}&page=${page - 1}&format=json&nojsoncallback=1`
        );
        const upo = response.data.photos.photo;
        setLoading(false);
          setImages([...upo]);
          setSize(10)
          if(size===10) setImages([...images,...upo]);
      }
    })();
  };

  return (
    <>
      <div className="wrapper">
        <div className="container">
          <div className="images__container">
            <InfiniteScroll
              dataLength={images.length}
              next={fetchImages}
              loader={<Loading />}
              hasMore={true}
              style={{
                overflow: "visible",
              }}
            >
              {loading ? (
                <Loading />
              ) : (
                images.map((image, index) => (
                  <motion.div
                    className="image"
                    whileHover={{ scale: 1.03 }}
                    key={index}
                    onClick={() =>
                      setSelectedImg(
                        `https://live.staticflickr.com/${image.server}/${image.id}_${image.secret}_b.jpg`
                      )
                    }
                  >
                    <Image data={image} layout />
                  </motion.div>
                ))
              )}
            </InfiniteScroll>
          </div>
        </div>
      </div>
      {selectedImg && (
        <Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg} />
      )}
    </>
  );
}
