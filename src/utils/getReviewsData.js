export const getReviewsData = async () => {
  const apiUrl = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${process.env.NEXT_PLACE_ID}&fields=reviews&reviews_no_translations=true&key=${process.env.NEXT_GOOGLE_API_KEY}`

  const res = await fetch(apiUrl)

  if (!res.ok) {
    throw new Error('Failed to fetch reviews data')
  }

  const data = await res.json()

  return data?.result?.reviews || []
}
