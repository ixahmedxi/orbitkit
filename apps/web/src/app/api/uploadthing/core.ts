import type { FileRouter } from 'uploadthing/next'

import { createUploadthing } from 'uploadthing/next'
import { UploadThingError } from 'uploadthing/server'

import { auth } from '@orbitkit/auth'

const f = createUploadthing()

export const fileRouter = {
  imageUploader: f({ image: { maxFileSize: '4MB' } })
    .middleware(async () => {
      const session = await auth()

      if (!session.user) {
        // eslint-disable-next-line @typescript-eslint/only-throw-error
        throw new UploadThingError({
          message: 'You must be logged in to upload files',
          code: 'BAD_REQUEST',
        })
      }

      return { userId: session.user.id }
    })
    .onUploadComplete(({ metadata, file }) => {
      console.log('Upload complete for userId:', metadata.userId)

      console.log('file url', file.url)

      return { uploadedBy: metadata.userId }
    }),
} satisfies FileRouter

export type OurFileRouter = typeof fileRouter
