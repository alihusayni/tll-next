import Image from 'next/image';

export default function ProfileImages() {
  return (
    <div className="flex flex-col items-center gap-4 lg:relative lg:h-[572px] lg:w-[700px]">
      <Image
        src="/assets/about/about_img_consult.png"
        alt="Consultation image"
        width={332}
        height={412}
        className="w-[332px] h-[412px] lg:absolute lg:top-[27px] lg:right-0 lg:w-[332px] lg:h-[412px] rounded-[16px] object-cover grayscale"
      />
      <Image
        src="/assets/about/about_img_Tuan.png"
        alt="Tuan Le profile image"
        width={332}
        height={412}
        className="w-[332px] h-[412px] lg:absolute lg:top-[131px] lg:left-0 lg:w-[332px] lg:h-[412px] rounded-[16px] object-cover grayscale lg:transform-none transform translate-x-1/2"
      />
    </div>
  );
}