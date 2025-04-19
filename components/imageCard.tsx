type ImageCardProps = {
    images : string[],
    heading: string,
    paragraph: string,
    link:string

}
export default function ImageCard({images, heading, paragraph, link}: ImageCardProps){
    return (
        <div className="flex w-1/4 shadow-sm flex-col gap-4 p-2">
                <div className="flex gap-2">
                  <div className="flex-1 bg-gray-400">
                    <img src={images[0]} alt="some image"  className="w-full h-full object-contain transition-transform duration-300 transfrom hover:scale-110"/>
                  </div>  
                  <div className="flex-1 bg-gray-800">
                    <img src={images[1]} alt="some image"  className="w-full h-full object-contain transition-transform duration-300 transfrom hover:scale-110"/>
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="flex-1 bg-gray-400">
                    <img src={images[2]} alt="some image"  className="w-full h-full object-contain transition-transform duration-300 transfrom hover:scale-110"/>
                  </div>
                  <div className="flex-1 bg-gray-800">
                    <img src={images[3]} alt="some image"  className="w-full h-full object-contain transition-transform duration-300 transfrom hover:scale-110"/>
                  </div>
                </div>
                <div className="text-center">
                    <h2>{heading}</h2>
                    <p>{paragraph}</p>
                    <p>{link}</p>
                </div>
              </div>
    )
}