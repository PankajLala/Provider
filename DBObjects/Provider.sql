USE [Provider]
GO

/****** Object:  Table [dbo].[Inpatient]    Script Date: 11/16/2017 10:59:04 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING ON
GO

CREATE TABLE [dbo].[Inpatient](
	[DRDefinition] [varchar](255) NULL,
	[ProviderId] [varchar](50) NULL,
	[ProviderName] [varchar](50) NULL,
	[ProviderStreetAddress] [varchar](50) NULL,
	[ProviderCity] [varchar](50) NULL,
	[ProviderState] [varchar](50) NULL,
	[ProviderZipCode] [varchar](50) NULL,
	[HospitalReferralRegionDescription] [varchar](50) NULL,
	[TotalDischarges] [numeric](18, 0) NULL,
	[AverageCoveredCharges] [float] NULL,
	[AverageTotalPayments] [float] NULL,
	[AverageMedicarePayments] [float] NULL
) ON [PRIMARY]

GO

SET ANSI_PADDING OFF
GO


