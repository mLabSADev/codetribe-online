import { Stack, Typography, Button } from "@mui/material"
import { Col, Progress } from "antd"
import React from "react"

/**
 *
 * @param {number} progress in percentage 0 - 100
 * @param {number} lesson lesson number
 * @param {string} title course module
 * @param {string} course course name
 * @param {string} link link to course
 * @returns
 */

function StudentProgress({ progress, title, course, lesson, link }) {
  return (
    <Stack
      minWidth={{ xs: "100%", sm: 400 }}
      direction={{ xs: "column", sm: "row", md: "row" }}
      alignItems={"center"}
      spacing={3}
    >
      <Stack
        width={{ xs: "100%", sm: "auto", md: "auto" }}
        alignItems={"center"}
      >
        {/* Needs refresh to apply TODO: will try to use mui Box */}
        {window.screen.width < 500 ? (
          <Progress
            strokeColor={{ "0%": "#00467F", "100%": "#87d068" }}
            percent={progress}
            width={"100%"}
          />
        ) : (
          <Progress
            type="dashboard"
            strokeColor={{ "0%": "#00467F", "100%": "#87d068" }}
            percent={progress}
          />
        )}
      </Stack>
      <Stack spacing={2}>
        <Stack>
          <Typography variant="subtitle2">
            {course} - Lesson {lesson}
          </Typography>
          <Typography variant="h6" fontWeight={"bold"}>
            {title}
          </Typography>
        </Stack>
        {progress == 100 ? null : (
          <Button
            disabled={course === "React Native"} // TODO: temporary disabler
            size="small"
            disableElevation
            sx={{
              alignSelf: "flex-start",
              borderRadius: 30,
              backgroundColor: "#87d068", // TODO: need to figure out how to setup MUI provider for theming
            }}
            variant="contained"
          >
            <Typography fontSize={14} variant="button">
              {/* TODO: customize condition */}
              {course === "React Native" ? "Locked" : "Continue Learning"}
            </Typography>
          </Button>
        )}
      </Stack>
    </Stack>
  )
}

export default StudentProgress
