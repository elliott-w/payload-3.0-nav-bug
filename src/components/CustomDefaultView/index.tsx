import { DefaultTemplate } from '@payloadcms/next/templates'
import Link from 'next/link.js'
import { redirect } from 'next/navigation.js'
import React from 'react'

import type { AdminViewProps } from 'payload'

import { Button, SetStepNav } from '@payloadcms/ui'

import './index.scss'
const baseClass = 'custom-default-view'

export const CustomDefaultView: React.FC<AdminViewProps> = ({
  initPageResult,
  params,
  searchParams,
}) => {
  const {
    permissions,
    req: {
      payload,
      payload: {
        config: {
          routes: { admin: adminRoute },
        },
      },
      user,
    },
    visibleEntities,
  } = initPageResult

  console.log(visibleEntities)

  // If an unauthorized user tries to navigate straight to this page,
  // Boot 'em out
  if (!user || (user && !permissions?.canAccessAdmin)) {
    return redirect(`${adminRoute}/unauthorized`)
  }

  return (
    <DefaultTemplate
      i18n={initPageResult.req.i18n}
      locale={initPageResult.locale}
      params={params}
      payload={payload}
      permissions={permissions}
      searchParams={searchParams}
      user={user}
      visibleEntities={{
        collections: ['users'],
        globals: [],
      }}
    >
      <SetStepNav
        nav={[
          {
            label: 'Custom Admin View with Default Template',
          },
        ]}
      />
      <div
        className={`${baseClass}__content`}
        style={{
          paddingLeft: 'var(--gutter-h)',
          paddingRight: 'var(--gutter-h)',
        }}
      >
        <h1>Custom Admin View</h1>
        <p>
          Here is a custom admin view that was added in the Payload config. It uses the Default
          Template, so the sidebar is rendered.
        </p>
        <div className="custom-view__controls">
          <Button Link={Link} buttonStyle="secondary" el="link" to={`${adminRoute}`}>
            Go to Dashboard
          </Button>
          &nbsp; &nbsp; &nbsp;
        </div>
      </div>
    </DefaultTemplate>
  )
}
