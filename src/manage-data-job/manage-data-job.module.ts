import { Module } from '@nestjs/common';
import { EgplCasemgmtCaseAssService } from './egpl-casemgmt-case-ass.service';
import { ConfigModule } from '@nestjs/config';
import { LoggerProviderModule } from '@/shared/providers';
import { TypeOrmModule } from '@nestjs/typeorm';
import { egplCasemgmtCaseAssCDCEntity } from '@/cisco-ece-entities-cdc/egpl_casemgmt_case_ass.entity';
import { egplCasemgmtCaseAssEntity } from '@/cisco-ece-entities/egpl_casemgmt_case_ass.entity';
import { egmlEmailDataCDCEntity } from '@/cisco-ece-entities-cdc/egml_email_data.entity';
import { egmlEmailAddressCDCEntity } from '@/cisco-ece-entities-cdc/egml-email-address.entity';
import { egmlEmailAttachmentLinkCDCEntity } from '@/cisco-ece-entities-cdc/egml-email-attachment-link.entity';
import { egmlEmailAttachmentCDCEntity } from '@/cisco-ece-entities-cdc/egml-email-attachment.entity';
import { egmlEmailDataAltCDCEntity } from '@/cisco-ece-entities-cdc/egml-email-data-alt.entity';
import { egmlEmailCDCEntity } from '@/cisco-ece-entities-cdc/egml-email.entity';
import { egplEventHistoryCaseMgmtCDCEntity } from '@/cisco-ece-entities-cdc/egpl_event_history_case_mgmt.entity';
import { egplCasemgmtActivityCDCEntity } from '@/cisco-ece-entities-cdc/egpl-casemgmt-activity.entity';
import { egplCasemgmtCaseCDCEntity } from '@/cisco-ece-entities-cdc/egpl-casemgmt-case.entity';
import { egplCasemgmtContactPointCDCEntity } from '@/cisco-ece-entities-cdc/egpl-casemgmt-contact-point.entity';
import { egplCasemgmtCustomerCDCEntity } from '@/cisco-ece-entities-cdc/egpl-casemgmt-customer.entity';
import { egplDepartmentCDCEntity } from '@/cisco-ece-entities-cdc/egpl-department.entity';
import { egplNotesCDCEntity } from '@/cisco-ece-entities-cdc/egpl-notes.entity';
import { egplRoutingQueueCDCEntity } from '@/cisco-ece-entities-cdc/egpl-routing-queue.entity';
import { egplUserCDCEntity } from '@/cisco-ece-entities-cdc/egpl-user.entity';
import { egmlEmailDataEntity } from '@/cisco-ece-entities/egml_email_data.entity';
import { egmlEmailAddressEntity } from '@/cisco-ece-entities/egml-email-address.entity';
import { egmlEmailAttachmentLinkEntity } from '@/cisco-ece-entities/egml-email-attachment-link.entity';
import { egmlEmailAttachmentEntity } from '@/cisco-ece-entities/egml-email-attachment.entity';
import { egmlEmailDataAltEntity } from '@/cisco-ece-entities/egml-email-data-alt.entity';
import { egmlEmailEntity } from '@/cisco-ece-entities/egml-email.entity';
import { egplEventHistoryCaseMgmtEntity } from '@/cisco-ece-entities/egpl_event_history_case_mgmt.entity';
import { egplCasemgmtActivityEntity } from '@/cisco-ece-entities/egpl-casemgmt-activity.entity';
import { egplCasemgmtCaseEntity } from '@/cisco-ece-entities/egpl-casemgmt-case.entity';
import { egplCasemgmtCustomerEntity } from '@/cisco-ece-entities/egpl-casemgmt-customer.entity';
import { egplCasemgmtContactPointEntity } from '@/cisco-ece-entities/egpl-casemgmt-contact-point.entity';
import { egplCasemgmtCpointEmailEntity } from '@/cisco-ece-entities/egpl-casemgmt-cpoint-email.entity';
import { egplDepartmentEntity } from '@/cisco-ece-entities/egpl-department.entity';
import { egplNotesEntity } from '@/cisco-ece-entities/egpl-notes.entity';
import { egplRoutingQueueEntity } from '@/cisco-ece-entities/egpl-routing-queue.entity';
import { egplUserEntity } from '@/cisco-ece-entities/egpl-user.entity';
import { EgmlEmailDataService } from './egml-email-data.service';
import { EgmlEmailAddressService } from './emgl-email-address.service';
import { EgmlEmailAttachmentLinkService } from './egml-email-attachment-link.service';
import { EgmlEmailAttachmentService } from './egml-email-attachment.service';
import { EgmlEmailDataAltService } from './egml-email-data-alt.service';
import { EgmlEmailService } from './egml-email.service';
import { EgplCasemgmtActivityService } from './egpl-casemgmt-activity.service';
import { EgplEventHistoryCasemgmtService } from './egpl-event-history-case-mgmt.service';
import { EgplCasemgmtCaseService } from './egpl-casemgmt-case.service';
import { EgplCasemgmtContactPointService } from './egpl-casemgmt-contact-point.service';
import { EgplCasemgmtCpointEmailService } from './egpl-casemgmt-cpoint-email.service';
import { EgplCasemgmtCustomerService } from './egpl-casemgmt-customer.service';
import { EgplDepartmentService } from './egpl-department.service';
import { EgplNoteService } from './egpl-notes.service';
import { EgplRoutingQueueService } from './egpl-routing-queue.service';
import { EgplUserService } from './egpl-user.service';
import { egplCasemgmtCpointEmailCDCEntity } from '@/cisco-ece-entities-cdc/egpl-casemgmt-cpoint-email.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      egmlEmailDataCDCEntity,
      egmlEmailAddressCDCEntity,
      egmlEmailAttachmentLinkCDCEntity,
      egmlEmailAttachmentCDCEntity,
      egmlEmailDataAltCDCEntity,
      egmlEmailCDCEntity,
      egplCasemgmtCaseAssCDCEntity,
      egplEventHistoryCaseMgmtCDCEntity,
      egplCasemgmtActivityCDCEntity,
      egplCasemgmtCaseCDCEntity,
      egplCasemgmtContactPointCDCEntity,
      egplCasemgmtCpointEmailCDCEntity,
      egplCasemgmtCustomerCDCEntity,
      egplDepartmentCDCEntity,
      egplNotesCDCEntity,
      egplRoutingQueueCDCEntity,
      egplUserCDCEntity,
    ], 'db_source'),
    TypeOrmModule.forFeature([
      egmlEmailDataEntity,
      egmlEmailAddressEntity,
      egmlEmailAttachmentLinkEntity,
      egmlEmailAttachmentEntity,
      egmlEmailDataAltEntity,
      egmlEmailEntity,
      egplCasemgmtCaseAssEntity,
      egplEventHistoryCaseMgmtEntity,
      egplCasemgmtActivityEntity,
      egplCasemgmtCaseEntity,
      egplCasemgmtContactPointEntity,
      egplCasemgmtCpointEmailEntity,
      egplCasemgmtCustomerEntity,
      egplDepartmentEntity,
      egplNotesEntity,
      egplRoutingQueueEntity,
      egplUserEntity
    ], 'db_destination'),
    ConfigModule,
    LoggerProviderModule,
  ],
  providers: [
    EgmlEmailDataService,
    EgmlEmailAddressService,
    EgmlEmailAttachmentLinkService,
    EgmlEmailAttachmentService,
    EgmlEmailDataAltService,
    EgmlEmailService,
    EgplCasemgmtCaseAssService,
    EgplEventHistoryCasemgmtService,
    EgplCasemgmtActivityService,
    EgplCasemgmtCaseService,
    EgplCasemgmtContactPointService,
    EgplCasemgmtCpointEmailService,
    EgplCasemgmtCustomerService,
    EgplDepartmentService,
    EgplNoteService,
    EgplRoutingQueueService,
    EgplUserService
  ]
})
export class ManageDataJobModule { }
