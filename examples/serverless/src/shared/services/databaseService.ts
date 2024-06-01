import { INDEX_TYPE, Table } from "@typedorm/common";
import { BatchManager, EntityManager, createConnection, getBatchManager, getEntityManager } from "@typedorm/core";
import { Service } from "lambda-forge";
import User from "../../User/entities/User";
import Post from "../../Post/entities/Post";

const TABLE_NAME = "example-blog-app";

@Service
export default class DatabaseService {

  private table: Table;
  public objects: EntityManager;
  public batch: BatchManager;

  constructor() {
    this.table = new Table({
      name: TABLE_NAME,
      partitionKey: 'PK',
      sortKey: 'SK',
      indexes: {
        GSI1: {
          type: INDEX_TYPE.GSI,
          partitionKey: 'GSI1PK',
          sortKey: 'GSI1SK'
        }
      }
    })

    createConnection({
      table: this.table,
      entities: [
        User,
        Post
      ]
    });

    this.objects = getEntityManager();
    this.batch = getBatchManager();
  }
}