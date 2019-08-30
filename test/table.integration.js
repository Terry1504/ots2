'use strict';

var expect = require('expect.js');
var client = require('./common');

describe('table', function () {
  it('createTable should ok', async function () {
    var keys = [{ 'name': 'uid', 'type': 'STRING' }];
    var capacityUnit = {read: 1, write: 1};
    var options = {
      table_options: {
        time_to_live: -1,// 数据的过期时间, 单位秒, -1代表永不过期. 假如设置过期时间为一年, 即为 365 * 24 * 3600.
        max_versions: 1
      }
    };
    var response = await client.createTable('metrics', keys, capacityUnit, options);
    expect(response).to.be.ok();
  });

  it('updateTable should ok', async function () {
    try {
      var capacityUnit = {read: 2, write: 1};
      var response = await client.updateTable('metrics', capacityUnit);
      expect(response).to.be.ok();
      expect(response.capacity_unit_details.capacity_unit.read).to.be(2);
      expect(response.capacity_unit_details.capacity_unit.write).to.be(1);
    } catch (e) {
      expect(e.name).to.be('OTSTooFrequentReservedThroughputAdjustmentError');
      expect(e.message).to.be('Reserved throughput adjustment is too frequent.');
      return;
    }
  });

  it('listTable should ok', async function () {
    var response = await client.listTable();
    expect(response.table_names).to.be.ok();
    expect(response.table_names.length).to.be.above(0);
  });

  it('describeTable should ok', async function () {
    var response = await client.describeTable('metrics');
    expect(response).to.be.ok();
    expect(response.table_meta.table_name).to.be('metrics');
    expect(response.reserved_throughput_details).to.be.ok();
  });

  it('deleteTable should ok', async function () {
    var response = await client.deleteTable('metrics');
    expect(response).to.be.ok();
  });
});
