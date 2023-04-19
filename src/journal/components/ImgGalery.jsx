import { ImageList, ImageListItem } from "@mui/material"


export const ImgGalery = ({images}) => {
  return (
    <ImageList sx={{ width: '100%', height: 600 }} cols={4} rowHeight={164}>
  {
  images.map((images) => (
    <ImageListItem key={images}>
      <img
        src={`${images}?w=164&h=164&fit=crop&auto=format`}
        srcSet={`${images}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
        alt="imagen de la nota"
        loading="lazy"
      />
    </ImageListItem>
  ))}
</ImageList>
  )
}