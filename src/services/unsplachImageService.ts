import axios from 'axios'
import { useInfiniteQuery } from '@tanstack/react-query'

const UNSPLASH_ACCESS_KEY = import.meta.env.VITE_APP_UNSPLASH_ACCESS_KEY

const getUnsplashImages = async (pageParam: number, perPage: number) => {
  const res = await axios.get(
    `https://api.unsplash.com/photos?page=${pageParam}&per_page=${perPage}`,
    { headers: { Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}` } },
  )
  return res.data
}

export const useUnsplashImages = (perPage: number) => {
  return useInfiniteQuery({
    queryKey: ['unsplashImages'],
    queryFn: ({ pageParam }) => getUnsplashImages(pageParam, perPage),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages, lastPageParam) => lastPageParam + 1,
  })
}
