import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { Request } from './entities/request.entity';
import { MaterialDetail } from './entities/material-detail.entity';

@Injectable()
export class RequestsService {
  constructor(
    @InjectRepository(Request)
    private readonly requestRepo: Repository<Request>,
    @InjectRepository(MaterialDetail)
    private readonly detailRepo: Repository<MaterialDetail>,
  ) {}

  async create(dto: CreateRequestDto): Promise<Request> {
    const request = this.requestRepo.create({
      requestNo: dto.requestNo,
      requestDate: dto.requestDate,
      requester: dto.requester,
      department: dto.department,
      status: dto.status ?? 'PENDING',
      remarks: dto.remarks,
      materials: dto.materials as any,
    });

    return this.requestRepo.save(request);
  }

  findAll(): Promise<Request[]> {
    return this.requestRepo.find({ order: { createdAt: 'DESC' } });
  }

  async findOne(id: number): Promise<Request> {
    const request = await this.requestRepo.findOne({ where: { id } });
    if (!request) {
      throw new NotFoundException(`Request with id ${id} not found`);
    }
    return request;
  }

  async update(id: number, dto: UpdateRequestDto): Promise<Request> {
    const existing = await this.requestRepo.findOne({ where: { id } });
    if (!existing) {
      throw new NotFoundException(`Request with id ${id} not found`);
    }

    existing.requestNo = dto.requestNo ?? existing.requestNo;
    existing.requestDate = dto.requestDate ?? existing.requestDate;
    existing.requester = dto.requester ?? existing.requester;
    existing.department = dto.department ?? existing.department;
    existing.status = dto.status ?? existing.status;
    existing.remarks = dto.remarks ?? existing.remarks;

    if (dto.materials) {
      await this.detailRepo.delete({ requestId: id });

      const newDetails = dto.materials.map((m) =>
        this.detailRepo.create({
          ...m,
          requestId: id,
        }),
      );
      existing.materials = newDetails;
    }

    return this.requestRepo.save(existing);
  }


}
