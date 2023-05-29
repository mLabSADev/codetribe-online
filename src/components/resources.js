import { Card, Chip, Stack, Typography, CardContent } from "@mui/material"
import OpenInNewIcon from "@mui/icons-material/OpenInNew"
import { Image } from "antd"
import React from "react"

/**
 *
 * @param {*} title
 * @param {*} description
 * @param {*} links
 * @param {*} image

 */
const ResourceCards = ({ title, description, links, image }) => {
  return (
    <Card sx={{ width: "100%", borderRadius: 5 }} variant="outlined">
      <CardContent>
        <Stack
          width={"100%"}
          direction={{
            xs: "column",
            sm: "row",
            md: "row",
            lg: "column",
            xl: "row",
          }}
          spacing={2}
          alignItems={"center"}
        >
          <Stack width={"100%"} spacing={2}>
            <Stack flex={1}>
              <Typography variant="h5" fontWeight={"bold"}>
                {title}
              </Typography>
              <Typography variant="body1">{description}</Typography>
            </Stack>
            <Stack
              width={"100%"}
              direction={"row"}
              flexWrap={"wrap"}
              paddingY={0}
              spacing={1}
              gap={1}
              py={2}
            >
              {links.map(item => {
                return (
                  <Chip
                    clickable
                    component="a"
                    target="_blank"
                    href={item.link}
                    size="small"
                    sx={{ alignSelf: "flex-start" }}
                    label={item.label}
                    deleteIcon={<OpenInNewIcon />}
                  />
                )
              })}
            </Stack>
          </Stack>
          <Stack>
            <Image width={200} src={image} />
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  )
}
export default ResourceCards
