USE [Provider]
GO

/****** Object:  StoredProcedure [dbo].[GetProvidersDynamic]    Script Date: 11/16/2017 10:59:36 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE  [dbo].[GetProvidersDynamic]
@max_discharges Numeric,
@min_discharges Numeric,
@max_average_covered_charges Float,
@min_average_covered_charges Float,
@min_average_medicare_payments Float,
@max_average_medicare_payments Float,
@state Varchar(10),
@selectparams Varchar(255)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

Declare @sqlString NVarchar(max)

Set @sqlString = 'Select ' +  @selectparams + ' From InPatient
where 
		TotalDischarges <= Coalesce(@max_discharges, TotalDischarges)' + 
		' AND TotalDischarges >= Coalesce(@min_discharges,TotalDischarges)' +
		' AND AverageCoveredCharges <= Coalesce(@max_average_covered_charges, AverageCoveredCharges)'+
		' and AverageCoveredCharges >= Coalesce(@min_average_covered_charges, AverageCoveredCharges)' +
		' AND AverageMedicarePayments <= Coalesce(@max_average_medicare_payments, AverageMedicarePayments )' +
		' and AverageMedicarePayments >= Coalesce(@min_average_medicare_payments, AverageMedicarePayments )' +
		' AND ProviderState =  Coalesce(@state, ProviderState)'

END

Exec sp_executesql @sqlString, 
N'@selectparams varchar(255), @max_discharges Numeric, @min_discharges Numeric, @max_average_covered_charges Float, @min_average_covered_charges Float, @max_average_medicare_payments Float, @min_average_medicare_payments Float, @state varchar(255)', 
@selectparams,@max_discharges, @min_discharges , @max_average_covered_charges , @min_average_covered_charges , @max_average_medicare_payments , @min_average_medicare_payments ,@state 
								

GO


