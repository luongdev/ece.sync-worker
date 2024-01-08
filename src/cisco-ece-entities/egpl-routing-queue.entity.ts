import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { egplCasemgmtActivity } from './egpl-casemgmt-activity.entity';

@Entity({ name: 'EGPL_ROUTING_QUEUE' })
export class egplRoutingQueueEntity {
  @PrimaryColumn({ name: 'QUEUE_ID' })
  queueId: number;

  @Column({ nullable: false, name: 'QUEUE_NAME' })
  queueName: string;

  @Column({ nullable: false, name: 'QUEUE_STATE' })
  queueState: number;

  @Column({ nullable: false, name: 'DEPARTMENT_ID' })
  departmentId: number;

  @Column({ nullable: false, name: 'QUEUE_TYPE' })
  queueType: number;

  @Column({ nullable: false, name: 'QUEUE_ROUTING_TYPE' })
  queueRoutingType: number;

  @Column({ nullable: false, name: 'QUEUE_CHAT_ROUTING_TYPE' })
  queueChatRoutingType: number;

  @Column({ nullable: true, name: 'QUEUE_SKILL_FLAG' })
  queueSkillFlag: number;

  @Column({ nullable: true, name: 'WHO_CREATED' })
  whoCreated: number;

  @Column({ nullable: false, name: 'WHEN_CREATED' })
  whenCreated: Date;

  @Column({ nullable: true, name: 'WHO_MODIFIED' })
  whoModified: number;

  @Column({ nullable: true, name: 'QUEUE_DESCRIPTION' })
  queueDescription: string;

  @Column({ nullable: true, name: 'QUEUE_LINK' })
  queueLink: number;

  @Column({ nullable: true, name: 'QUEUE_ROUNDROBIN_INDEX' })
  queueRoundrobinIndex: number;

  @Column({ nullable: true, name: 'QUEUE_LEVEL_1_AGE_TIME' })
  queueLevel1AgeTime: number;

  @Column({ nullable: true, name: 'QUEUE_LEVEL_2_AGE_TIME' })
  queueLevel2AgeTime: number;

  @Column({ nullable: true, name: 'QUEUE_LEVEL_3_AGE_TIME' })
  queueLevel3AgeTime: number;

  @Column({ nullable: true, name: 'QUEUE_PRIORITY' })
  queuePriority: number;

  @Column({ nullable: true, name: 'QUEUE_PUSH_FLAG' })
  queuePushFlag: number;

  @Column({ nullable: true, name: 'CHAT_DEFAULT_TRANSFER_QUEUE' })
  chatDefaultTransferQueue: number;

  @Column({ nullable: true, name: 'DEFAULT_KB_FOLDER' })
  defaultKbFolder: number;

  @Column({ nullable: false, name: 'DEFAULT_SOSIAL_QUEUE' })
  defaultSosialQueue: number;

  @Column({ nullable: false, name: 'SOSIAL_ROUTING_TYPE' })
  SosialRoutingType: number;

  @Column({ nullable: false, name: 'MAX_CHAT_QUEUE_DEPTH' })
  maxChatQueueDepth: number;

  @Column({ nullable: false, name: 'CHAT_QUEUE_PRIORITY' })
  chatQueuePriority: number;

  @Column({ nullable: false, name: 'CHAT_ALTERNATE_ENGAGEMENT' })
  chatAlternateEngagement: number;

  @OneToOne(() => egplCasemgmtActivity, (activity) => activity.queue)
  @JoinColumn({ name: 'QUEUE_ID', referencedColumnName: 'queueId' })
  activity: egplCasemgmtActivity;

};