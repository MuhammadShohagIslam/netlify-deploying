import ReactImageMagnify from "react-image-magnify";
// import { Carousel } from "react-responsive-carousel";
import Image from "next/image";
import { useState } from "react";

const CardZoomCarousel = ({ images, title }: { images: any; title: string }) => {
    const [imageUrl, setImageUrl] = useState(`${images[0].url}` as string);
    return (
        <>
            <div>
                <ReactImageMagnify
                    {...{
                        smallImage: {
                            alt: "Wristwatch by Ted Baker London",
                            isFluidWidth: true,
                            src: `${imageUrl}`,
                            sizes: '(max-width: 480px) 100vw, (max-width: 1200px) 30vw, 360px'
                        },
                        largeImage: {
                            src: `${imageUrl}`,
                            width: 900,
                            height: 1800,
                        },
                        isHintEnabled: true,
                        shouldHideHintAfterFirstActivation: false,
                        shouldUsePositiveSpaceLens: true,
                    }}
                />
            </div>
            <div className="grid grid-cols-5 gap-2 cursor-pointer mt-4">
                {images &&
                    images.length > 0 &&
                    images.map((image: any) => (
                        <div
                            key={image.url}
                            className="border border-gray-400"
                            onClick={() => setImageUrl(image.url)}
                        >
                            <Image
                                className="w-full"
                                alt={title}
                                width={80}
                                height={80}
                                src={image.url}
                            />
                        </div>
                    ))}
            </div>

            {/* <Carousel
                showArrows={false}
                infiniteLoop
                renderThumbs={() =>
                    images.map((image: any) => (
                        <Image
                            src={image.url}
                            alt={title}
                            key={image.public_id}
                            priority
                            width={85}
                            height={85}
                        />
                    ))
                }
            >
                {images &&
                    images.length > 0 &&
                    images.map((image: any) => (
                        <ReactImageMagnify
                            key={image.public_id}
                            {...{
                                smallImage: {
                                    alt: "Wristwatch by Ted Baker London",
                                    isFluidWidth: true,
                                    src: `${image.url}`,
                                    sizes: '(max-width: 480px) 100vw, (max-width: 1200px) 30vw, 360px'
                                },
                                largeImage: {
                                    src: `${image.url}`,
                                    width: 1426,
                                    height: 2000
                                   
                                },
                                enlargedImagePortalId: 'portal',
                            }}
                            
                        />
                        // <Image
                        //     className="h-full w-full"
                        //     alt={title}
                        //     width={150}
                        //     height={150}
                        //     src={image.url}
                        //     key={image.public_id}
                        // />
                    ))}
            </Carousel> */}
        </>
    );
};

export default CardZoomCarousel;
