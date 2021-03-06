USE [BiostimeDataCapture]
GO
/****** Object:  Table [dbo].[FaReportName]    Script Date: 04/18/2017 14:13:32 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[FaReportName](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](200) NOT NULL,
	[Remark] [nvarchar](200) NULL,
	[Enable] [bit] NOT NULL,
	[LastUpdated] [datetime] NOT NULL,
	[CreateTime] [datetime] NOT NULL,
 CONSTRAINT [PK_FaReportName] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ProcessForm]    Script Date: 04/18/2017 14:13:32 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ProcessForm](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[InstanceId] [nvarchar](50) NOT NULL,
	[StartDate] [datetime] NOT NULL,
	[ProcessId] [nvarchar](50) NOT NULL,
	[InitiatorId] [int] NOT NULL,
	[InitiatorName] [nvarchar](50) NOT NULL,
	[InitiatorDept] [nvarchar](50) NOT NULL,
	[LastUpdated] [datetime] NOT NULL,
	[CreateTime] [datetime] NOT NULL,
 CONSTRAINT [PK_dbo.ProcessForm] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[FaContent]    Script Date: 04/18/2017 14:13:32 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[FaContent](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NOT NULL,
	[Value] [int] NOT NULL,
 CONSTRAINT [PK_FaContent] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[FaCompany]    Script Date: 04/18/2017 14:13:32 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[FaCompany](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](200) NOT NULL,
	[Remark] [nvarchar](200) NULL,
	[Enable] [bit] NOT NULL,
	[LastUpdated] [datetime] NOT NULL,
	[CreateTime] [datetime] NOT NULL,
 CONSTRAINT [PK_FaCompany] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[FaCabinetNo]    Script Date: 04/18/2017 14:13:32 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[FaCabinetNo](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[CabinetNo] [nvarchar](300) NOT NULL,
	[Path] [nvarchar](300) NOT NULL,
	[Enable] [bit] NOT NULL,
	[LastUpdated] [datetime] NOT NULL,
	[CreateTime] [datetime] NOT NULL,
 CONSTRAINT [PK_FaCabinetNo] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[FaArchiveTranfer]    Script Date: 04/18/2017 14:13:32 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[FaArchiveTranfer](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[ProcessFormId] [bigint] NOT NULL,
	[ShenQingRenId] [int] NOT NULL,
	[ShenQingRenName] [nvarchar](50) NOT NULL,
	[ShenQingRenBumenId] [int] NOT NULL,
	[ShenQingRenBumenName] [nvarchar](50) NOT NULL,
	[ShenQingRiqi] [datetime] NOT NULL,
	[JieyueYuanyin] [nvarchar](50) NOT NULL,
	[LiuchengZhuangtai] [int] NULL,
 CONSTRAINT [PK_FaArchiveTranfer] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[FaArchive]    Script Date: 04/18/2017 14:13:32 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[FaArchive](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[Content] [nvarchar](200) NOT NULL,
	[Company] [nvarchar](2000) NOT NULL,
	[Year] [int] NOT NULL,
	[Month] [int] NULL,
	[VoucherWord] [nvarchar](2000) NULL,
	[VoucherNumber] [int] NULL,
	[VoucherNo] [nvarchar](2000) NULL,
	[VoucherNos] [nvarchar](2000) NULL,
	[Path] [nvarchar](2000) NOT NULL,
	[CabinetNo] [nvarchar](2000) NOT NULL,
	[HetongHao] [nvarchar](2000) NULL,
	[BaogaoMingcheng] [nvarchar](2000) NULL,
	[Remark] [nvarchar](2000) NOT NULL,
	[CreateTime] [datetime] NOT NULL,
	[ModifiedTime] [datetime] NOT NULL,
	[Beizhu] [nvarchar](2000) NULL,
 CONSTRAINT [PK_FaArchive] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Trigger [tgr_faArchive_InsertorUpdate]    Script Date: 04/18/2017 14:13:32 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE TRIGGER [dbo].[tgr_faArchive_InsertorUpdate] 
   ON [dbo].[FaArchive]
   AFTER  INSERT,DELETE,UPDATE
AS 
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for trigger here

    update FaCabinetNo set Enable = 1 where CabinetNo in (select CabinetNo from FaArchive)
    update FaCabinetNo set Enable = 0 where CabinetNo not in (select CabinetNo from FaArchive)
END
GO
/****** Object:  Table [dbo].[Jieyue]    Script Date: 04/18/2017 14:13:32 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Jieyue](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[TranferId] [bigint] NOT NULL,
	[ArchiveId] [bigint] NOT NULL,
	[ShenQingRenName] [nvarchar](100) NOT NULL,
	[JieyueTianshu] [int] NOT NULL,
	[JieyueShijian] [datetime] NOT NULL,
	[ZidingyiGuihuanShijian] [datetime] NULL,
	[GuihuanShijian] [datetime] NULL,
	[Jieyuezhuangtai] [int] NULL,
	[Guihuanzhuangtai] [int] NULL,
	[Remark] [nvarchar](50) NULL,
 CONSTRAINT [PK_Jieyue] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[FaProcess]    Script Date: 04/18/2017 14:13:32 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[FaProcess](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[TransferId] [bigint] NOT NULL,
	[ArchiveId] [bigint] NOT NULL,
	[Xuhao] [int] NOT NULL,
	[JieyueTianshu] [int] NOT NULL,
	[Remark] [nvarchar](100) NULL,
	[CreateTime] [datetime] NOT NULL,
	[ModifiedTime] [datetime] NOT NULL,
 CONSTRAINT [PK_FaProcess_1] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[FaAchriveHistory]    Script Date: 04/18/2017 14:13:32 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[FaAchriveHistory](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[AchriveId] [bigint] NOT NULL,
	[Content] [nvarchar](200) NOT NULL,
	[Company] [nvarchar](2000) NOT NULL,
	[Year] [int] NOT NULL,
	[Month] [int] NULL,
	[VoucherWord] [nvarchar](2000) NULL,
	[VoucherNumber] [int] NULL,
	[VoucherNo] [nvarchar](2000) NULL,
	[VoucherNos] [nvarchar](2000) NULL,
	[Path] [nvarchar](2000) NOT NULL,
	[CabinetNo] [nvarchar](2000) NOT NULL,
	[HetongHao] [nvarchar](2000) NULL,
	[BaogaoMingcheng] [nvarchar](2000) NULL,
	[Remark] [nvarchar](2000) NOT NULL,
	[CreateTime] [datetime] NOT NULL,
	[Beizhu] [nvarchar](2000) NULL,
 CONSTRAINT [PK_FaAchriveHistory] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Default [DF_FaCabinetNo_Status]    Script Date: 04/18/2017 14:13:32 ******/
ALTER TABLE [dbo].[FaCabinetNo] ADD  CONSTRAINT [DF_FaCabinetNo_Status]  DEFAULT ((1)) FOR [Enable]
GO
/****** Object:  Default [DF_FaCabinetNo_LastUpdated]    Script Date: 04/18/2017 14:13:32 ******/
ALTER TABLE [dbo].[FaCabinetNo] ADD  CONSTRAINT [DF_FaCabinetNo_LastUpdated]  DEFAULT (getdate()) FOR [LastUpdated]
GO
/****** Object:  Default [DF_FaCabinetNo_CreateTime]    Script Date: 04/18/2017 14:13:32 ******/
ALTER TABLE [dbo].[FaCabinetNo] ADD  CONSTRAINT [DF_FaCabinetNo_CreateTime]  DEFAULT (getdate()) FOR [CreateTime]
GO
/****** Object:  Default [DF_FaCompany_Enable]    Script Date: 04/18/2017 14:13:32 ******/
ALTER TABLE [dbo].[FaCompany] ADD  CONSTRAINT [DF_FaCompany_Enable]  DEFAULT ((1)) FOR [Enable]
GO
/****** Object:  Default [DF_FaCompany_LastUpdated]    Script Date: 04/18/2017 14:13:32 ******/
ALTER TABLE [dbo].[FaCompany] ADD  CONSTRAINT [DF_FaCompany_LastUpdated]  DEFAULT (getdate()) FOR [LastUpdated]
GO
/****** Object:  Default [DF_FaCompany_CreateTime]    Script Date: 04/18/2017 14:13:32 ******/
ALTER TABLE [dbo].[FaCompany] ADD  CONSTRAINT [DF_FaCompany_CreateTime]  DEFAULT (getdate()) FOR [CreateTime]
GO
/****** Object:  Default [DF_FaReportName_Enable]    Script Date: 04/18/2017 14:13:32 ******/
ALTER TABLE [dbo].[FaReportName] ADD  CONSTRAINT [DF_FaReportName_Enable]  DEFAULT ((1)) FOR [Enable]
GO
/****** Object:  Default [DF_FaReportName_LastUpdated]    Script Date: 04/18/2017 14:13:32 ******/
ALTER TABLE [dbo].[FaReportName] ADD  CONSTRAINT [DF_FaReportName_LastUpdated]  DEFAULT (getdate()) FOR [LastUpdated]
GO
/****** Object:  Default [DF_FaReportName_CreateTime]    Script Date: 04/18/2017 14:13:32 ******/
ALTER TABLE [dbo].[FaReportName] ADD  CONSTRAINT [DF_FaReportName_CreateTime]  DEFAULT (getdate()) FOR [CreateTime]
GO
/****** Object:  Default [DF_ProcessForm_LastUpdated]    Script Date: 04/18/2017 14:13:32 ******/
ALTER TABLE [dbo].[ProcessForm] ADD  CONSTRAINT [DF_ProcessForm_LastUpdated]  DEFAULT (getdate()) FOR [LastUpdated]
GO
/****** Object:  Default [DF_ProcessForm_CreateTime]    Script Date: 04/18/2017 14:13:32 ******/
ALTER TABLE [dbo].[ProcessForm] ADD  CONSTRAINT [DF_ProcessForm_CreateTime]  DEFAULT (getdate()) FOR [CreateTime]
GO
/****** Object:  ForeignKey [FK_FaAchrive_FaAchriveHistory]    Script Date: 04/18/2017 14:13:32 ******/
ALTER TABLE [dbo].[FaAchriveHistory]  WITH CHECK ADD  CONSTRAINT [FK_FaAchrive_FaAchriveHistory] FOREIGN KEY([AchriveId])
REFERENCES [dbo].[FaArchive] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[FaAchriveHistory] CHECK CONSTRAINT [FK_FaAchrive_FaAchriveHistory]
GO
/****** Object:  ForeignKey [FK_faArchiveTranfer_ProcessForm]    Script Date: 04/18/2017 14:13:32 ******/
ALTER TABLE [dbo].[FaArchiveTranfer]  WITH CHECK ADD  CONSTRAINT [FK_faArchiveTranfer_ProcessForm] FOREIGN KEY([ProcessFormId])
REFERENCES [dbo].[ProcessForm] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[FaArchiveTranfer] CHECK CONSTRAINT [FK_faArchiveTranfer_ProcessForm]
GO
/****** Object:  ForeignKey [FK_FaProcess_FaArchive]    Script Date: 04/18/2017 14:13:32 ******/
ALTER TABLE [dbo].[FaProcess]  WITH CHECK ADD  CONSTRAINT [FK_FaProcess_FaArchive] FOREIGN KEY([ArchiveId])
REFERENCES [dbo].[FaArchive] ([Id])
ON UPDATE CASCADE
GO
ALTER TABLE [dbo].[FaProcess] CHECK CONSTRAINT [FK_FaProcess_FaArchive]
GO
/****** Object:  ForeignKey [FK_FaProcess_FaArchiveTranfer]    Script Date: 04/18/2017 14:13:32 ******/
ALTER TABLE [dbo].[FaProcess]  WITH CHECK ADD  CONSTRAINT [FK_FaProcess_FaArchiveTranfer] FOREIGN KEY([TransferId])
REFERENCES [dbo].[FaArchiveTranfer] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[FaProcess] CHECK CONSTRAINT [FK_FaProcess_FaArchiveTranfer]
GO
/****** Object:  ForeignKey [FK_Jieyue_FaArchive]    Script Date: 04/18/2017 14:13:32 ******/
ALTER TABLE [dbo].[Jieyue]  WITH CHECK ADD  CONSTRAINT [FK_Jieyue_FaArchive] FOREIGN KEY([ArchiveId])
REFERENCES [dbo].[FaArchive] ([Id])
ON UPDATE CASCADE
GO
ALTER TABLE [dbo].[Jieyue] CHECK CONSTRAINT [FK_Jieyue_FaArchive]
GO
