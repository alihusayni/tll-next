import Image from 'next/image';

export default function ProfileImages() {
  return (
      <div className="relative h-[35.75rem] w-[43.75rem]">

          <Image
              src="https://tuanlelaw.s3.amazonaws.com/assets/about/about_img_consult.png"
              alt="Image of attorney conducting a client consultation"
              width={332}
              height={412}
              className="absolute top-[1.6875rem] right-0 w-[20.75rem] h-[25.75rem] rounded-[1rem] object-cover grayscale border mix-blend-luminosity"
          />

          <Image
              src="https://tuanlelaw.s3.amazonaws.com/assets/about/about_img_Tuan.png"
              alt="Tuan Le profile image"
              width={332}
              height={412}
              className="absolute top-[8.5rem] -left-[10.25rem] w-[20.75rem] h-[25.75rem] rounded-[1rem] object-cover grayscale border mix-blend-luminosity transform translate-x-1/2"
          />
      </div>

  );
}