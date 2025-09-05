import React from 'react';

interface GenericContentSectionProps {
  title: string;
  subtitle?: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  backgroundImage?: string;
  backgroundColor?: string;
  textColor?: string;
  buttonColor?: string;
  layout?: 'left' | 'right' | 'center';
}

const GenericContentSection: React.FC<GenericContentSectionProps> = ({
  title,
  subtitle,
  description,
  buttonText,
  buttonLink,
  backgroundImage,
  backgroundColor = '#F5F5F7',
  textColor = 'text-dark',
  buttonColor = 'bg-blue hover:bg-blue-dark',
  layout = 'left'
}) => {
  const contentAlignment = layout === 'center' ? 'text-center' : layout === 'right' ? 'text-right' : 'text-left';
  const flexAlignment = layout === 'center' ? 'justify-center' : layout === 'right' ? 'justify-end' : 'justify-start';

  return (
    <section className="overflow-hidden py-20">
      <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
        <div 
          className="relative z-1 overflow-hidden rounded-lg py-12.5 lg:py-17.5 xl:py-22.5 px-4 sm:px-7.5 lg:px-14 xl:px-19"
          style={{ backgroundColor }}
        >
          <div className={`max-w-[550px] w-full ${contentAlignment} ${layout === 'right' ? 'ml-auto' : layout === 'center' ? 'mx-auto' : ''}`}>
            {subtitle && (
              <span className={`block font-medium text-xl ${textColor} mb-3`}>
                {subtitle}
              </span>
            )}

            <h2 className={`font-bold text-xl lg:text-heading-4 xl:text-heading-3 ${textColor} mb-5`}>
              {title}
            </h2>

            <p className={textColor}>
              {description}
            </p>

            <a
              href={buttonLink}
              className={`inline-flex font-medium text-custom-sm text-white ${buttonColor} py-[11px] px-9.5 rounded-md ease-out duration-200 mt-7.5`}
            >
              {buttonText}
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};

export default GenericContentSection;