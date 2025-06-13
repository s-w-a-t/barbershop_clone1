import React from 'react'
import Hero from '@/components/Hero'
import About from '@/components/About'
import School from '@/components/School'
import Gallery from '@/components/Gallery'
import Services from '@/components/Services'
import Barbers from '@/components/Barbers'
import Contacts from '@/components/Contacts'
import Products from '@/components/Products'
import Reviews from '@/components/Reviews'
import CTA from '@/components/CTA'
import { performRequest } from '@/lib/datocms'
import { getReviewsData } from '@/utils/getReviewsData'

const PAGE_CONTENT_QUERY = `
  query Content {
    content {
      heroTitle
      heroLabel
      heroPics {
        url
        basename
        alt
        blurhash
      }
      aboutTitle
      aboutDescription
      aboutVideo {
        url
      }
      aboutPics {
        url
        basename
        alt
        blurhash
      }
      aboutBrands {
        url
        width
        height
        basename
        alt
        height
        width
        blurhash
      }
      schoolTitle
      schoolDescription
      schoolVideo {
        url
        thumbnailUrl
      }
      schoolPics {
        url
        basename
        alt
        blurhash
      }
      galleryTitle
      galleryPics {
        url
        basename
        alt
        blurhash
      }
      servicesTitle
      servicesLabelBase
      servicesLabelUpper
      servicesLabelTop
      servicesList {
        name
        basePrice
        upperPrice
        topPrice
      }
      barbersTitle
      barbersLabelBase
      barbersLabelUpper
      barbersLabelTop
      barbersButtonText
      barbersList {
        name
        description
        level
        link
        pics {
          url
          blurhash
        }
      }
      contactsTitle
      contactsMap
      productsTitle
      productsButtonText
      productsFootnote
      productsList {
        name
        label
        description
        pic {
          url
          basename
          alt
          blurhash
        }
      }
      reviewsTitle
      ctaTitle
      ctaDescription
      ctaButtonText
      ctaButtonLink
    }
    layout {
      instagram
      telegram
      orderLabel
      orderLink
    }
  }`

const Home = async () => {
  const reviews = await getReviewsData()
  const { data } = await performRequest({ query: PAGE_CONTENT_QUERY })
  const {
    heroTitle,
    heroLabel,
    heroPics,

    aboutTitle,
    aboutDescription,
    aboutVideo,
    aboutPics,
    aboutBrands,

    schoolTitle,
    schoolDescription,
    schoolVideo,
    schoolPics,

    galleryTitle,
    galleryPics,

    servicesTitle,
    servicesLabelBase,
    servicesLabelUpper,
    servicesLabelTop,
    servicesList,

    barbersTitle,
    barbersLabelBase,
    barbersLabelUpper,
    barbersLabelTop,
    barbersButtonText,
    barbersList,

    contactsTitle,
    contactsMap,

    productsTitle,
    productsButtonText,
    productsFootnote,
    productsList,

    reviewsTitle,

    ctaTitle,
    ctaDescription,
    ctaButtonText,
    ctaButtonLink,
  } = data?.content || {}

  const { instagram, telegram, orderLabel, orderLink } = data?.layout || {}

  return (
    <>
      <Hero
        title={heroTitle}
        label={heroLabel}
        pics={heroPics}
        orderLabel={orderLabel}
        orderLink={orderLink}
      />
      <About
        title={aboutTitle}
        descr={aboutDescription}
        video={aboutVideo}
        pics={aboutPics}
        brands={aboutBrands}
      />
      <School
        title={schoolTitle}
        descr={schoolDescription}
        video={schoolVideo}
        pics={schoolPics}
      />
      <Gallery title={galleryTitle} pics={galleryPics} />
      <Services
        title={servicesTitle}
        labelBase={servicesLabelBase}
        labelUpper={servicesLabelUpper}
        labelTop={servicesLabelTop}
        list={servicesList}
      />
      <Barbers
        title={barbersTitle}
        labelBase={barbersLabelBase}
        labelUpper={barbersLabelUpper}
        labelTop={barbersLabelTop}
        buttonText={barbersButtonText}
        list={barbersList}
      />
      <Contacts
        title={contactsTitle}
        map={contactsMap}
        instagram={instagram}
        telegram={telegram}
      />
      <Products
        title={productsTitle}
        buttonText={productsButtonText}
        footnote={productsFootnote}
        list={productsList}
      />
      {!!reviews.length && <Reviews title={reviewsTitle} list={reviews} />}
      <CTA
        title={ctaTitle}
        descr={ctaDescription}
        btnText={ctaButtonText}
        btnLink={ctaButtonLink}
      />
    </>
  )
}

export default Home
