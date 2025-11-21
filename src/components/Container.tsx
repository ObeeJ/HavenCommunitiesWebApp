import { FunctionComponent } from 'react';

const Container = () => {
  return (
    <div className="w-full max-w-[1280px] px-8 inline-flex flex-col justify-start items-start gap-16">
      <div className="self-stretch inline-flex justify-start items-start gap-8 flex-wrap content-start">
        <div className="flex-1 min-w-80 inline-flex flex-col justify-start items-center gap-4">
          <div className="w-12 h-12 relative bg-white rounded-[10px] outline outline-1 outline-offset-[-1px] outline-zinc-300 overflow-hidden">
            <div className="w-6 h-6 left-[12px] top-[12px] absolute overflow-hidden">
              <div className="w-5 h-5 left-[2px] top-[2px] absolute outline outline-2 outline-offset-[-1px] outline-gray-700" />
            </div>
          </div>
          <div className="self-stretch flex flex-col justify-start items-center gap-1">
            <div className="self-stretch text-center justify-start text-gray-900 text-lg font-extrabold font-['Avenir'] leading-7">Value</div>
            <div className="self-stretch text-center justify-start text-gray-600 text-base font-normal font-['Avenir'] leading-6">We are committed to helping people settle down in a conducive community and also helping people find the right investment to help them grow their wealth.</div>
          </div>
        </div>
        <div className="flex-1 min-w-80 inline-flex flex-col justify-start items-center gap-4">
          <div className="w-12 h-12 relative bg-white rounded-[10px] outline outline-1 outline-offset-[-1px] outline-zinc-300 overflow-hidden">
            <div className="w-6 h-6 left-[12px] top-[12px] absolute overflow-hidden">
              <div className="w-3.5 h-5 left-[4.50px] top-[2px] absolute outline outline-2 outline-offset-[-1px] outline-gray-700" />
            </div>
          </div>
          <div className="self-stretch flex flex-col justify-start items-center gap-1">
            <div className="self-stretch text-center justify-start text-gray-900 text-lg font-extrabold font-['Avenir'] leading-7">Excellence</div>
            <div className="self-stretch text-center justify-start text-gray-600 text-base font-normal font-['Avenir'] leading-6">We pursue excellence to the highest degree. We provide the best quality of product and service to our clients.</div>
          </div>
        </div>
        <div className="flex-1 min-w-80 inline-flex flex-col justify-start items-center gap-4">
          <div className="w-12 h-12 relative bg-white rounded-[10px] outline outline-1 outline-offset-[-1px] outline-zinc-300 overflow-hidden">
            <div className="w-6 h-6 left-[12px] top-[12px] absolute overflow-hidden">
              <div className="w-5 h-5 left-[2.07px] top-[2px] absolute outline outline-2 outline-offset-[-1px] outline-gray-700" />
            </div>
          </div>
          <div className="self-stretch flex flex-col justify-start items-center gap-1">
            <div className="self-stretch text-center justify-start text-gray-900 text-lg font-extrabold font-['Avenir'] leading-7">Integrity</div>
            <div className="self-stretch text-center justify-start text-gray-600 text-base font-normal font-['Avenir'] leading-6">We display unparalleled transparency in our dealings with our customers, thereby establishing trust and confidence in our brand.</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Container as FunctionComponent;
